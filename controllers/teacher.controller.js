const Teacher = require('../models/teacher.model');
const {registerValidation, loginValidation} = require('../middlewares/validation');
const bcrypt = require('bcrypt');

//Check if the registration number is already in the database
const register = (async (req, res)=>{
    const {name, surname, registerNumber, phone, email, password} = req.body;
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Check if the teacher is already in the database
    const emailExist = await Teacher.findOne({email});
    if(emailExist) return res.status(400).send('Email already exist');
    const registerNumberExist = await Teacher.findOne({registerNumber});
    if(registerNumberExist) return res.status(400).send('Registration number already exist')
     
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    //Create a new teacher
    const teacher = new Teacher({
        name,
        surname,
        registerNumber,
        phone,
        email,
        password: hashedPassword
    }) ;
    console.log(teacher);
    try{
        const authToken = await teacher.generateToken();
        console.log(authToken)
        res.status(201).json(teacher);
    }catch(err){
        res.status(400).send(err);
    }
})

const login = (async (req, res) =>{
    const{registerNumber, password } = req.body;

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        //Check if the registration number exist
        const teacher = await teacher.findOne({registerNumber});
        if(!teacher) return res.status(400).send('Invalid register number or password');
        //check if the password is correct
        const validPass = await bcrypt.compare(password, teacher.password);
        if(!validPass) return res.status(400).send('Invalid register number or password');

        //Create and asign a token
        const token = await teacher.generateToken();

        res.status(200).json({
            name : teacher.name,
            surname: teacher.surname,
            registerNumber: teacher.registerNumber,
            email : teacher.email,
            token: token
        })
})

const getTeacher = (async (req, res) =>{
    try{
        teacher = await Teacher.findById(req.params._id).select('-password')
        res.status(200).json(teacher);
    }
    catch(err){
        res.status(400).send(err);
    }
});

const updateTeacher = (async (req, res) =>{
    if(!ObjectID.isValid(req.teacher._id))
        return res.status(400).send('Id unknown :'+ req.teacher._id);
    const {name, surname, email, phone} = req.body
    try{
        const updateTeacher = await Teacher.findByIdAndUpdate(
            req.teacher._id,
            {
                surname: surname,
                name: name,
                email: email,
                phone: phone
            },
            {new: true},
        ).select('-password');
        res.status(200).json(updateTeacher);
    }
    catch(err){
        res.status(400).send(err)
    }
})

const deleteTeacher = (async (req, res) =>{
    
    try{

        await Teacher.deleteOne(req.teacher._id);
        res.status(200).json({message: "teacher deleted"});
    }
    catch(err){
        res.status(400).json({ message: err});
    }
});

const getAllTeachers = (async (req, res)=>{
    try{
        teachers = await Teacher.find();
        res.status(200).json(teachers);
    }
    catch(err){
        res.status(400).send(err)
    }
});

const profil = (async (req, res)=>{
    let profil;
    if(req.file) profil = `profil/${req.file.filename}`
    try{
        await Teacher.findByIdAndUpdate(
            req.params.id,
            {avatar : profil},
            {new: true}
        );
        res.status(200).send("profil updated")
    } 
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

const deleteProfil = (async (req, res) =>{
    try{
        await Teacher.findByIdAndUpdate(
            req.params.id,
            {avatar: 'profil/profil.jpg'},
            {new: true}
        );
        res.status(200).json({message : 'delete succes'})
    }
    catch(err){
        res.statut(400).send(err)
    }
})

module.exports = {register, login, getTeacher, updateTeacher, deleteTeacher, getAllTeachers, profil, deleteProfil}