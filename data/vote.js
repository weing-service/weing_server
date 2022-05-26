const mongoose = require("mongoose")

const VoteSchema = new mongoose.Schema(
  {
    project: String,
    title: { type: String, required: true, maxLength: 10 },
    info: { type: String, maxLength: 50 },
    voteDate: { type: Date, required: true },
    startDate: Date,
    finishDate: Date,
    endTime: Date,
    intoCal: Boolean,
    category: { type: String, required: true },
    isPlural: Boolean,
    isAnonymous: Boolean,
  },
  { versionKey: false }
)

module.exports = mongoose.model("vote", VoteSchema)
