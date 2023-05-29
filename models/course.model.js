const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    ue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UE',
        required: true
    },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall',
        required: true
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
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

module.exports = mongoose.model('Course', CourseSchema);