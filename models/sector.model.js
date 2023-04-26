const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add level name'],
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Sector', sectorSchema);