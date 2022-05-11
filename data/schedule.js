const mongoose = require('mongoose');
const {Schema} = mongoose;

const scheduleSchema = new Schema({
    title: {
        type: String,
        length: 10
    },
    info: {
        type: String,
        length: 50
    },
    startDate: {
        type: Date
    },
    finishDate: {
        type: Date
    },
    category: {
        type: String
    },
    intoCal: {
        type: Boolean
    },
    repeated: {
        type: Boolean
    }
})

module.exports = mongoose.model('schedule', scheduleSchema);