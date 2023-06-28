const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    effectif: {
        type: Number,
        required: [true, 'Please add effectif'],
    },
    level: {
        type: String,
        required: [true, 'Please add level']
    },
    sector: {
        type: String,
        required: [true, 'Please add sector']
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Class', classSchema);