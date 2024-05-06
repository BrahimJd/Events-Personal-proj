const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Permission name is required"],
    unique: true,
  },
  is_default: {
    type: Number,
    default: 0,
  },
});
