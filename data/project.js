const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    info: String,
    users: Array,
    schedules: Array,
    startDate: { type: Date, required: true },
    finishDate: { type: Date, required: true },
    coverImg: Object,
    profileImg: Object,
  },
  { versionKey: false }
)

module.exports = mongoose.model("Project", ProjectSchema)
