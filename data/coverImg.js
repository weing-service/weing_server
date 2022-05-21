const mongoose = require("mongoose")

const imgSchema = new mongoose.Schema(
  {
    originalFileName: String,
    serverFileName: String,
    savedName: String,
    size: Number,
    category: String,
  },
  { versionKey: false }
)

module.exports = mongoose.model("Image", imgSchema)
