const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Sector', sectorSchema);