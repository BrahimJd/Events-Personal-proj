const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
