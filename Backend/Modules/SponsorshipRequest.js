const mongoose = require("mongoose");

const sponsorshipRequestSchema = new mongoose.Schema({
  sponsor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

const SponsorshipRequest = mongoose.model(
  "SponsorshipRequest",
  sponsorshipRequestSchema
);

module.exports = SponsorshipRequest;
