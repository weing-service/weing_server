const mongoose = require("mongoose")

const Vote_infoSchema = new mongoose.Schema(
    {
        project_title: {
            type: String,
            required: true
        },
        vote_title: {
            type: String,
            required: true
        }, // 투표 제목
        vote_count: {
            type: Number,
            required: true
        },
        user_id: {
            type: Number,
            required: true
        },
        vote_time: Object, // 투표한 시간
        x: Number, // 경도
        y: Number // 위도
    },
    { versionKey: false }
)

module.exports = mongoose.model("vote_info", Vote_infoSchema)
