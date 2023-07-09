const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    hall : {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    description: {
        type: String
    },
    start: {
        type: Number,
        required : true
    },
    end: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);