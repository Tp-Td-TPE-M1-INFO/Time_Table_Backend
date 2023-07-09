const asyncHandler = require('express-async-handler');
const Event = require('../models/event.model');
const Planning = require('../models/planning.model')
//Get all events
const getEvents = (async (req,res) => {
    try{
        const  events = await Event.find();
        res.status(200).json(events);
    }
    catch(err){
        res.status(400).json(err);
    }
    
});

//Get one event
const getEvent = asyncHandler(async (req,res) => {
    let event = await Event.findById(req.params.id);
    if(!event){
        res.status(404);
        throw new Error('Event not found');
    }
    res.status(200).json(event);
});

//Create class
const createEvent = asyncHandler(async (req,res) => {

    const {eventName, hall, description} = req.body;
    const previews = await Planning.find({
        $or: [
          { $and: [{ start: { $lte: req.body.end } }, { end: { $gte: req.body.end } }] },
          { $and: [{ start: { $lte: req.body.start } }, { end: { $gte: req.body.start } }] },
        ],
      });
    if(previews){
      let err = [];
        previews.forEach(preview, ()=>{
            if(hall == preview.hall)
                err.push({ hall : "salle déjà occupée"})
        })
        if(err) return res.status(400).json(err);
    }
    try{
        const event = await Event.create({
            eventName,
            hall,
            description
        });
        res.status(200).json(event);
    }
    catch(err){
        res.status(500).json(err)
    }
  
});

//Update events
const updateEvent = asyncHandler(async (req,res) => {
    const event = await Event.findById(req.params.id);
    if(!event){
        res.status(404);
        throw new Error('this event not found');
    };
    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedEvent);
});

//delete class
const deleteEvent = asyncHandler(async (req,res) => {
    const event = await Event.findById(req.params.id);
    if(!event){
        res.status(404);
        throw new Error('this event not found');
    };
    await Event.deleteOne();
    res.status(200).json(event)
});

module.exports = {getEvent, getEvents, createEvent, updateEvent, deleteEvent};