const mongoose = require("mongoose")
const { Schema } = mongoose

const scheduleSchema = new Schema({
  project: {
    type: String,
  },
  title: {
    type: String,
    length: 10,
  },
  info: {
    type: String,
    length: 50,
  },
  startDate: {
    type: String,
  },
  finishDate: {
    type: String,
  },
  category: {
    type: String,
  },
  intoCal: {
    type: Boolean,
  },
  repeated: {
    type: Boolean,
  },
  isCompleted: Boolean,
})

module.exports = mongoose.model("schedule", scheduleSchema)
