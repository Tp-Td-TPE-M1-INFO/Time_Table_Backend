const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    effectif: {
        type: Number,
        required: true,
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level'
    },
    sector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sector'
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Class', classSchema);