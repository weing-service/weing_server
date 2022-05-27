const mongoose = require("mongoose")

const VoteSchema = new mongoose.Schema(
  {
    project: String,
    title: { type: String, required: true, maxLength: 10 },
    info: { type: String, maxLength: 50 },
    startDate: Date, // 투표 받을 날짜의 시작 날짜
    endDate: Date, // 투표 받을 날짜의 끝나는 날짜
    deadLine: Date, // 투표 마감 시간
    intoCal: Boolean, // 캘린더 반영 여부
    isCompleted: { type: Boolean, default: false }, // 완료 여부
    userIds: Array,
  },
  { versionKey: false }
)

module.exports = mongoose.model("vote", VoteSchema)
