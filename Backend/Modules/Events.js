const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "Music",
      "Sports",
      "Art",
      "Business",
      "Science",
      "Technology",
      "Other",
    ],
    required: true,
  },
  image: { type: String, required: false },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
