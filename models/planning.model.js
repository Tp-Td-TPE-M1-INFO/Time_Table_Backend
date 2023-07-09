const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema({
    name:{
        type: String
    },
    ue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UE',
       
    },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall',
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    description: {
        type: String
    },
    start: {
        type: Number,
        required: true
    },
    end: {
        type: Number,
        required: true
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Planning', planningSchema);