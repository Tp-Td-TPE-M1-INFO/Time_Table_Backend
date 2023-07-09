const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
    sectorName: {
        type: String,
        unique: true,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Sector', sectorSchema);