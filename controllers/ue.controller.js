const asyncHandler = require('express-async-handler');
const UE = require('../models/ue.model');

//Get all UEs
const getUE = asyncHandler(async (req,res) =>{
    const ues = await UE.find();
    res.status(200).json(ues);
});

//Get one UE
const get_one_UE = asyncHandler(async (req,res) =>{
    const ue = await UE.findById(req.params.id);
    if(!ue){
        res.status(404);
        throw new Error('UE not found');
    }
    res.status(200).json(ue);
});

//Create new UE
const createUE = asyncHandler(async (req,res) =>{
    console.log('the request body is :', req.body);
    const {code, intitule} = req.body;
    if(!code || !intitule){
        res.status(400);
        throw new Error('All fields are madatory')
    }
    const ue = await UE.create({
        code,
        intitule
    });
    res.status(201).json(ue);
});

//Update UE
const updateUE = asyncHandler(async (req,res) =>{
    const ue = await UE.findById(req.params.id);
    if(!ue){
        res.status(404);
        throw new Error('UE not found');
    };
    const updatedUE = await UE.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedUE);
});

//delete UE
const deleteUE = asyncHandler(async (req,res) =>{
    const ue = await UE.findById(req.params.id);
    if(!ue){
        res.status(404);
        throw new Error('UE not found');
    };
    await UE.remove();
    res.status(200).json({message: 'ok'});
});

module.exports = {getUE, createUE, get_one_UE, updateUE, deleteUE};