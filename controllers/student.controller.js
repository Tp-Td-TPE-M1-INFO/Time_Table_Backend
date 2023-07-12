const Student = require('../models/student.model');
const {registerValidation} = require('../middlewares/validation');
const bcrypt = require('bcrypt');
const errorCtr = require('../utils/error.utils');

//Check if the registration number is already in the database
const register = (async (req, res)=>{
    const {name, surname, registerNumber, phone, email, password} = req.body;
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    //Create a new Student
    try{
        const student = await Student.create({
            name,
            surname,
            registerNumber,
            phone,
            email,
            password: hashedPassword
        }) ;

        res.status(201).json({
            name : student.name,
            surname: student.surname,
            registerNumber: student.registerNumber,
            email : student.email,
            avatar : student.avatar,
        })
    }catch(err){
        const errors = errorCtr.signUpErrors(err)
        res.status(400).json(errors);
    }
})   

const getStudent = (async (req, res) =>{
    try{
        const student = await Student.findById(req.student._id).select('-password')
        res.status(200).json(student);
    }
    catch(err){
        res.status(400).send(err);
    }
});

const updateStudent = (async (req, res) =>{

    const {name, surname, email, phone} = req.body
    try{
        const updateStudent = await Student.findByIdAndUpdate(
            req.student._id,
            {
                surname: surname,
                name: name,
                email: email,
                phone: phone
            },
            {new: true},
        ).select('-password');
        res.status(200).json(updateStudent);
    }
    catch(err){
        res.status(400).send(err)
    }
})

const deleteStudent = (async (req, res) =>{
   
        try{
            await Student.deleteOne(req.params.id);
            res.status(200).json({message: "student deleted"});
        }
        catch(err){
            res.status(400).json({ message: err});
        }
    }
   
});

const getAllStudents = (async (req, res)=>{
    try{
        const students = await Student.find();
        res.status(200).json(students);
    }
    catch(err){
        res.status(400).send(err)
    }
})

const profil = (async (req, res)=>{
    let profil;
    if(req.file) profil = `profil/${req.file.filename}`
    try{
        await Student.findByIdAndUpdate(
            req.student._id,
            {avatar : profil},
            {new: true}
        );
        res.status(200).send("image uploaded")
    } 
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})
const deleteProfil = (async (req, res) =>{
    try{
        await Student.findByIdAndUpdate(
            req.student._id,
            {avatar: 'profil/profil.jpg'},
            {new: true}
        );
        res.status(200).json({message : 'delete succes'})
    }
    catch(err){
        res.statut(400).send(err)
    }
})

module.exports = {register, getStudent, updateStudent, deleteStudent, getAllStudents, profil, deleteProfil}
