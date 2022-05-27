const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    info: String,
    users: Array,
    schedules: Array,
    startDate: { type: Object, required: true },
    finishDate: { type: Object, required: true },
    coverImg: Object,
    profileImg: Object,
  },
  { versionKey: false }
)

module.exports = mongoose.model("Project", ProjectSchema)
