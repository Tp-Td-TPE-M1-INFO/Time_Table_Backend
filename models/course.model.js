const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    ue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ues',
        required: true
    },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'halls',
        required: true
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers',
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    description: {
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);