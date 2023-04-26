const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    effectif: {
        type: Number,
        required: [true, 'Please add effectif'],
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'levels',
        required: [true, 'Please add level']
    },
    sector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sectors',
        required: [true, 'Please add sector']
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Class', classSchema);