const mongoose = require("mongoose")
const { Schema } = mongoose

const scheduleSchema = new Schema(
  {
    project: {
      type: String,
      required : true
    },
    title: {
      type: String,
      maxLength: 10,
      required: true
    },
    info: {
      type: String,
      maxLength: 50,
    },
    startDate: {
      type: String,
      required: true
    },
    finishDate: {
      type: String,
      required: true
    },
    place: {
      type: String
    },
    category: {
      type: String,
    },
    intoCal: {
      type: Boolean,
      default: false
    },
    repeated: {
      type: Boolean,
      default: false
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    users: Array,
  },
  { versionKey: false }
)

module.exports = mongoose.model("schedule", scheduleSchema)
