require("dotenv").config();
const Express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const app = Express();
const port = process.env.PORT || 3000;

// Template Engine
app.use(expressLayout);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");

// Body Parser
app.use(bodyParser.json());

// Routes
app.use("/", require("./Routes/authRoutes"));
app.use("/news", require("./Routes/newsRoutes"));
app.use("/events", require("./Routes/eventRoutes"));
app.use("/users", require("./Routes/userRoutes"));

Mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
