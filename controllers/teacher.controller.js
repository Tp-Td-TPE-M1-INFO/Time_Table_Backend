const Teacher = require('../models/teacher.model');
const {registerValidation} = require('../middlewares/validation');
const bcrypt = require('bcrypt');
const errorCtr = require('../utils/error.utils');

//Check if the registration number is already in the database
const addTeacher = (async (req, res)=>{
    
    if(req.admin){
        const {name, surname, registerNumber, phone, email, password} = req.body;
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //Create a new teacher
    
        try{
            const teacher = await Teacher.create({
                name,
                surname,
                registerNumber,
                phone,
                email,
                password: hashedPassword
            });
    
            res.status(201).json({
                name : teacher.name,
                surname: teacher.surname,
                registerNumber: teacher.registerNumber,
                email : teacher.email,
                avatar : teacher.avatar,
            })
        }catch(err){
            const errors = errorCtr.signUpErrors(err)
            res.status(400).json(errors);
        }

    }
    else{
        res.status(401).json({message: "you are not a admin you can not create a teacher"})
    }
})

const getTeacher = (async (req, res) =>{
    try{
        const teacher = await Teacher.findById(req.params._id).select('-password')
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
        const teachers = await Teacher.find();
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
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            {avatar : profil},
            {new: true}
        );
        res.status(200).send(teacher)
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

module.exports = {addTeacher, getTeacher, updateTeacher, deleteTeacher, getAllTeachers, profil, deleteProfil}