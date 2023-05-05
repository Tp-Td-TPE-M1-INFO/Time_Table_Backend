const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
        default: '../images/profil/profil.png'
    },
    role:{
        type: String,
        default : "student"
    },
    token:{
        type : String,
        required: true
    }
},
{
    timestamp : true
}
);

teacherSchema.methods .generateToken = async function(){
    const authToken = jwt.sign({ _id: this._id.toString()}, process.env.TOKEN_SECRET,{
       expiresIn: 30*24*60*60*1000,
     });
     this.tokens.push({authToken});
     await this.save();
     return authToken
}

module.exports = mongoose.model('Teacher', teacherSchema);