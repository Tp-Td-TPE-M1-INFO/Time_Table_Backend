const User = require('../models/student.model');

const {registerValidation, loginValidation} = require('../middlewares/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../config/generateToken')



//Check if the registration number is already in the database
const register = (async (req, res)=>{
    const {name, surname, registerNumber, phone, email, password} = req.body;
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Check if the user is already in the database
    const emailExist = await User.findOne({email});
    if(emailExist) return res.status(400).send('Email already exist');
    const registerNumberExist = await User.findOne({registerNumber});
    if(registerNumberExist) return res.status(400).send('Registration number already exist')
    
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    //Create a new user
    const user = new User({
        name,
        surname,
        registerNumber,
        phone,
        email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
})   

const login = (async (req, res) =>{
    const{registerNumber, password } = req.body;

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        //Check if the registration number exist
        const student = await User.findOne({registerNumber});
        if(!student) return res.status(400).send('Invalid register number or password');
        //check if the password is correct
        const validPass = await bcrypt.compare(password, student.password);
        if(!validPass) return res.status(400).send('Invalid register number or password');

        //Create and asign a token
        const token = generateToken(student._id);

        res.header('auth-token', token).send({
            name : student.name,
            surname: student.surname,
            registerNumber: student.registerNumber,
            email : student.email,
            token: token
        })
})

module.exports = {register, login}