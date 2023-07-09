const asyncHandler = require('express-async-handler');
const OtherEvent = require('../models/event.model');

//Get all otherEvents
const getOtherEvents = asyncHandler(async (req,res) => {
    let otherEvents = await OtherEvent.find();
    res.status(200).json(otherEvents)
});

//Get one otherEvent
const getOtherEvent = asyncHandler(async (req,res) => {
    let otherEvent = await OtherEvent.findById(req.params.id);
    if(!otherEvent){
        res.status(404);
        throw new Error('OtherEvent not found');
    }
    res.status(200).json(otherEvent);
});

//Create class
const createOtherEvent = asyncHandler(async (req,res) => {
    console.log('the request body is :', req.body);
    const {name, description} = req.body;
    if(!name){
        res.status(400);
        throw new Error('All name is mandatory')
    };
    const otherEvent = await OtherEvent.create({
        name,
        description
    });
    res.status(200).json(otherEvent);
});

//Update otherEvents
const updateOtherEvent = asyncHandler(async (req,res) => {
    const otherEvent = await OtherEvent.findById(req.params.id);
    if(!otherEvent){
        res.status(404);
        throw new Error('this event not found');
    };
    const updatedOtherEvent = await OtherEvent.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedOtherEvent);
});

//delete class
const deleteOtherEvent = asyncHandler(async (req,res) => {
    const otherEvent = await OtherEvent.findById(req.params.id);
    if(!otherEvent){
        res.status(404);
        throw new Error('this event not found');
    };
    await OtherEvent.deleteOne();
    res.status(200).json(otherEvent)
});

module.exports = {getOtherEvent, getOtherEvents, createOtherEvent, updateOtherEvent, deleteOtherEvent};