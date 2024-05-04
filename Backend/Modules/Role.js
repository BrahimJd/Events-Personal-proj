const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Role name is required"],
    unique: true,
  },
  description: {
    type: String,
  },
  permissions: {
    type: [String],
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
