const mongoose = require('mongoose');

const ueSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Please enter ue code'],
    },
    intitule: {
        type: String,
        required: [true, 'Please enter ue intitule'],
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('UE', ueSchema);