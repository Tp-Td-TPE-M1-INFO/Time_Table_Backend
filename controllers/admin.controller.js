const Admin = require('../models/admin.model');
const {registerValidation} = require('../middlewares/validation');
const bcrypt = require('bcrypt');
const errorCtr = require('../utils/error.utils');

//Check if the registration number is already in the database
const addAdmin = (async (req, res)=>{
    
    if(req.admin){
        const {name, surname, registerNumber, phone, email, password} = req.body;
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //Create a new Admin
    
        try{
            const admin = await Admin.create({
                name,
                surname,
                registerNumber,
                phone,
                email,
                password: hashedPassword
            });
    
            res.status(201).json({
                _id :   admin._id,
                name : admin.name,
                surname: admin.surname,
                registerNumber: admin.registerNumber,
                email : admin.email,
                avatar : admin.avatar,
                role  : admin.role
            })
        }catch(err){
            const errors = errorCtr.signUpErrors(err)
            res.status(400).json(errors);
        }

    }
    else{
        res.status(401).json({message: "you are not a admin you can not create a admin"})
    }
})

const getAdmin = (async (req, res) =>{
    try{
        const admin = await Admin.findById(req.admin._id).select('-password')
        res.status(200).json(admin);
    }
    catch(err){
        res.status(400).send(err);
    }
});

const updateAdmin = (async (req, res) =>{
    if(!ObjectID.isValid(req.admin._id))
        return res.status(400).send('Id unknown :'+ req.params.id);
    const {name, surname, email, phone} = req.body
    try{
        const updateAdmin = await Admin.findByIdAndUpdate(
            req.admin._id,
            {
                surname: surname,
                name: name,
                email: email,
                phone: phone
            },
            {new: true},
        ).select('-password');
        res.status(200).json(updateAdmin);
    }
    catch(err){
        res.status(400).send(err)
    }
})

const deleteAdmin = (async (req, res) =>{
    
    try{

        await Admin.deleteOne(req.params.id);
        res.status(200).json({message: "Admin deleted"});
    }
    catch(err){
        res.status(400).json({ message: err});
    }
});

const getAllAdmins = (async (req, res)=>{
    try{
        const admins = await Admin.find();
        res.status(200).json(admins);
    }
    catch(err){
        res.status(400).send(err)
    }
});

const profil = (async (req, res)=>{
    let profil;
    if(req.file) profil = `profil/${req.file.filename}`
    try{
        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            {avatar : profil},
            {new: true}
        );
        res.status(200).send(admin)
    } 
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

const deleteProfil = (async (req, res) =>{
    try{
        await Admin.findByIdAndUpdate(
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

module.exports = {addAdmin, getAdmin, updateAdmin, deleteAdmin, getAllAdmins, profil, deleteProfil}