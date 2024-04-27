const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Add more fields as needed
  companyName: { type: String, required: true },
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

module.exports = Sponsor;
