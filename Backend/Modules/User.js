const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    enum: ["Manager", "Member", "Sponsor"],
    default: "Member",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for email queries
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
