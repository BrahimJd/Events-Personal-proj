const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Add more fields as needed
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
