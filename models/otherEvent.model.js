const mongoose = require('mongoose');

const OtherEventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('OtherEvent', OtherEventSchema);