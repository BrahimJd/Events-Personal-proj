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
    origin: "https://eventify-frontend-jbco.onrender.com",
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
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Uploadthing
app.use("/api/uploadthing", uploadthingRoutes);

// Template Engine
app.use(expressLayout);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
