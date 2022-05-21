const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    info: String,
    users: Array,
    finishDate: Date,
    coverImg: Object,
    profileImg: Object,
  },
  { versionKey: false }
)

module.exports = mongoose.model("Project", ProjectSchema)
