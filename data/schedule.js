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
      type: Object,
      required: true
    },
    finishDate: {
      type: Object,
      required: true
    },
    place: {
      type: String
    },
    category: {
      type: String,
    },
    color: {
      type: String
    },
    intoCal: {
      type: Boolean,
      default: false
    },
    users: Array,
  },
  { versionKey: false }
)

module.exports = mongoose.model("schedule", scheduleSchema)
