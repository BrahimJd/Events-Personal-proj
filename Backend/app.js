require("dotenv").config();
const Express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const app = Express();
const port = process.env.PORT || 3000;
const authRoutes = require("./Routes/authRoutes");
const {
  authorizationPage,
  authsponsorreq,
} = require("./MiddleWares/authorizationMiddleware");
const authMiddleware = require("./MiddleWares/authmiddleware");

// Template Engine
app.use(expressLayout);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.json());

Mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Routes
// authentification
app.use("/api/auth", authRoutes);
// protected route requiring manager role
app.get("/manager", authMiddleware, authorizationPage, (req, res) => {
  res.send("Welcome Manager");
});
// protected route requiring sponsor role
app.get("/sponsor", authMiddleware, authsponsorreq, (req, res) => {
  res.send("Welcome Sponsor");
});

app.use("/events", require("./Routes/eventRoutes"));

app.use("/news", require("./Routes/newsRoutes"));

app.use("/users", require("./Routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
