const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    surname: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    
    registerNumber: {
        type : String,
        required: true,
        unique: true,
        maxlength: 7,
        minLength: 7
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    phone: {
        type: String,
    },
    avatar:{
        type: String,
        default: '../images/profil/profil.png'
    },
    role:{
        type: String,
        default : "student"
    },
},
{
    timestamps: true
}); 

module.exports = mongoose.model('Student', studentSchema);   