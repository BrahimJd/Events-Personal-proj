require("dotenv").config();
const Express = require("express");
const Mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const app = Express();
const port = process.env.PORT || 3000;

// Template Engine
app.use(expressLayout);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

Mongoose.connect("mongodb://localhost:27017/event_management")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});
