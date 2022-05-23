const mongoose = require("mongoose")

const VoteSchema = new mongoose.Schema(
    {
        project_title: String,
        vote_title: String, // 투표 제목
        user_id: Number,
        vote_time: Array, // 투표한 시간
        vote_place: Array // 투표한 장소
    }
)

module.exports = mongoose.model("vote_info", VoteSchema)
