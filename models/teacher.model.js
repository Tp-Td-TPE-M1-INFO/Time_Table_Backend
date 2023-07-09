const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({

    name: {
        type : String,
        required : true,
    },
    surname: {
        type : String,
        required : true,
    },
    registerNumber: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    avatar:{
        type: String,
        default: 'profil/profil.jpg'
    },
    role:{
        type: String,
        default : "teacher"
    },
},
{
    timestamps : true
}
);

module.exports = mongoose.model('Teacher', teacherSchema);