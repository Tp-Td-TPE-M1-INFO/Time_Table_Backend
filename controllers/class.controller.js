const asyncHandler = require('express-async-handler');
const Class = require('../models/class.model');
const { default: mongoose } = require('mongoose');

//Get all classes
const getClasses = asyncHandler(async (req,res) => {
    const classes = await Class.find();
    res.status(200).json(classes)
});

//Get one class
const getClass = asyncHandler(async (req,res) => {
    const classe = await Class.findById(req.params.id);
    if(!classe){
        res.status(404);
        throw new Error('Class not found');
    }
    res.status(200).json(classe);
});

//Create class
const createClass = asyncHandler(async (req,res) => {
    console.log('the request body is :', req.body);
    const {sector, level, effectif} = req.body;
    if(!sector || !level || !effectif){
        res.status(400);
        throw new Error('All Fields are mandatory')
    };
    const classe = await Class.create({
        sector,
        level,
        effectif
    });
    res.status(200).json(classe);
});

//Update classes
const updateClass = asyncHandler(async (req,res) => {
    const classe = await Class.findById(req.params.id);
    if(!classe){
        res.status(404);
        throw new Error('Class not found');
    };
    const updatedClass = await Class.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedClass);
});

//delete class
const deleteClass = asyncHandler(async (req,res) => {
    const classe = await Class.findById(req.params.id);
    if(!classe){
        res.status(404);
        throw new Error('Class not found');
    };
    await Class.deleteOne();
    res.status(200).json(classe)
});

module.exports = {getClass, getClasses, createClass, updateClass, deleteClass};