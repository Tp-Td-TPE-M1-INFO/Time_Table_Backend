const asyncHandler = require('express-async-handler');
const Level = require('../models/level.model');

//Get all Levels
const getLevels = asyncHandler(async (req,res) =>{
    const levels = await Level.find();
    res.status(200).json(levels);
});

//Get one Level
const getLevel = asyncHandler(async (req,res) =>{
    const level = await Level.findById(req.params.id);
    if(!level){
        res.status(404);
        throw new Error('Level not found');
    }
    res.status(200).json(level);
});

//Create new Level
const createLevel = asyncHandler(async (req,res) =>{
    console.log('the request body is :', req.body);
    const {name} = req.body;
    if(!name){
        res.status(400);
        throw new Error('All fields are madatory')
    }
    const level = await Level.create({
        name
    });
    res.status(201).json(level);
});

//Update Level
const updateLevel = asyncHandler(async (req,res) =>{
    const level = await Level.findById(req.params.id);
    if(!level){
        res.status(404);
        throw new Error('Level not found');
    };
    const updatedLevel = await Level.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedLevel);
});

//delete Level
const deleteLevel = asyncHandler(async (req,res) =>{
    const level = await Level.findById(req.params.id);
    if(!level){
        res.status(404);
        throw new Error('Level not found');
    };
    await Level.deleteOne();
    res.status(200).json(level);
});

module.exports = {getLevels, createLevel, getLevel, updateLevel, deleteLevel};