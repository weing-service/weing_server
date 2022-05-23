const mongoose = require("mongoose")

const VoteSchema = new mongoose.Schema(
  {
    project: String,
    title: { type: String, required: true, maxlength: 10 },
    info: { type: String, maxlength: 50 },
    voteDate: { type: Date }, // required: true
    startTime: Date,
    endTime: Date,
    finishDate: Date, // 필수, 디폴트 값 지정해야 함
    intoCal: Boolean,
    category: String, // 투표 유형
    createdDate: Date, // 생성 날짜
  },
  { versionKey: false }
)

module.exports = mongoose.model("vote", VoteSchema)
