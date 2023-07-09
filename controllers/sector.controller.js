const asyncHandler = require('express-async-handler');
const Sector = require('../models/sector.model');

//Get all Sectors
const getSectors = asyncHandler(async (req,res) =>{
    const sectors = await Sector.find();
    res.status(200).json(sectors);
});

//Get one Sector
const getSector = asyncHandler(async (req,res) =>{
    const sector = await Sector.findById(req.params.id);
    if(!sector){
        res.status(404);
        throw new Error('Sector not found');
    }
    res.status(200).json(sector);
});

//Create new Sector
const createSector = asyncHandler(async (req,res) =>{
    console.log('the request body is :', req.body);
    const {name} = req.body;
    if(!name){
        res.status(400);
        throw new Error('All fields are madatory')
    }
    const sector = await Sector.create({
        name
    });
    res.status(201).json(sector);
});

//Update Sector
const updateSector = asyncHandler(async (req,res) =>{
    const sector = await Sector.findById(req.params.id);
    if(!sector){
        res.status(404);
        throw new Error('Sector not found');
    };
    const updatedSector = await Sector.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedSector);
});

//delete Sector
const deleteSector = asyncHandler(async (req,res) =>{
    const sector = await Sector.findByIdAndDelete(req.params.id);
    if(!sector){
        res.status(404);
        throw new Error('Sector not found');
    };
    // await Sector.deleteOne();
    res.status(200).json(sector);
});

module.exports = {getSectors, createSector, getSector, updateSector, deleteSector};