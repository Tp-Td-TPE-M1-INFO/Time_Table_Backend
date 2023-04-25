const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    surname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    
    registerNumber: {
        type : String,
        required: true,
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
        required: true
    },
    phone: {
        type: String,
    },
    avatar:{
        type: String,
        default: '../images/profil/profil.png'
    },
    isPresident:{
        type: Boolean,
        default : false
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);