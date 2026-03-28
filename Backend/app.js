require("dotenv").config();
const Express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const app = Express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");
const authMiddleware = require("./Middlewares/authentificationMiddleware");
const uploadthingRoutes = require("./Routes/uploadRoutes");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "x-uploadthing-api-key",
      "x-uploadthing-upload-id",
      "x-uploadthing-upload-token",
      "x-uploadthing-version",
      "x-uploadthing-package",
      "uploadthing-client-version",
    ],
  })
);

app.options("*", cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Uploadthing
app.use("/api/uploadthing", uploadthingRoutes);

Mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  });

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Routes
// authentification
app.use("/auth", authRoutes);

app.use("/events", require("./Routes/eventRoutes"));

//app.use("/users", require("./Routes/userRoutes"));

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  
  // Handle Joi validation errors
  if (err.isJoi) {
    return res.status(400).json({ 
      error: "Validation error", 
      details: err.details?.[0]?.message 
    });
  }

  // Handle MongoDB errors
  if (err.name === "MongoError" || err.name === "MongoServerError") {
    return res.status(500).json({ error: "Database error" });
  }

  // Default error response
  res.status(err.status || 500).json({
    error: err.message || "Internal server error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
