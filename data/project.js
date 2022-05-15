const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    info: String,
    // users
    finishDate: Date,
    coverImg: Object,
  },
  { versionKey: false }
)

module.exports = mongoose.model("Project", ProjectSchema)
