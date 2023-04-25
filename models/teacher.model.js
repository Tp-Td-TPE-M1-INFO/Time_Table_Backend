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
    registrationNumber: {
        type: String,
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
        default: '../images/profil/profil.png'
    },
},
{
    timestamp : true
}
);

module.exports = mongoose.model('Teacher', teacherSchema);