const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
    token:{
        type : String,
        required: true
    }
},
{
    timestamps: true
}); 

studentSchema.methods .generateToken = async function(){
     const authToken = jwt.sign({ _id: this._id.toString()}, process.env.TOKEN_SECRET,{
        expiresIn: 30*24*60*60*1000,
      });
      this.token=authToken;
      await this.save();
      return authToken
}

module.exports = mongoose.model('Student', studentSchema);   