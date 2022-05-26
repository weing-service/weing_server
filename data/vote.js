const mongoose = require("mongoose")

const VoteSchema = new mongoose.Schema(
  {
    project: String,
    title: { type: String, required: true, maxLength: 10 },
    info: { type: String, maxLength: 50 },
    voteDate: { type: Date, required:true },
    startTime: Date,
    endTime: Date,
    finishDate: Date,
    intoCal: Boolean,
    category: {type:String, required:true},
  },
  { versionKey: false }
)

module.exports = mongoose.model("vote", VoteSchema)