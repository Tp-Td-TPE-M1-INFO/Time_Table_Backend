const asyncHandler = require("express-async-handler");
const Event = require("../models/event.model");
const Planning = require("../models/planning.model");
//Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Get one event
const getEvent = asyncHandler(async (req, res) => {
  let event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.status(200).json(event);
});

//Create class
const createEvent = async (req, res) => {
  const { eventName, hall, description, start, end } = req.body;

  const previews = await Planning.find({
    $or: [
      {
        $and: [
          { start: { $lte: req.body.end } },
          { end: { $gte: req.body.end } },
        ],
      },
      {
        $and: [
          { start: { $lte: req.body.start } },
          { end: { $gte: req.body.start } },
        ],
      },
    ],
  });
  console.log(previews);

  if (previews[0]) {
    let err = [];
    previews.forEach((preview) => {
      if (hall == preview.hall) err.push({ hall: "salle déjà occupée" });
    });
    if (err[0]) return res.status(400).json(err);
  }
  try {
    const event = await Event.create({
      eventName,
      hall,
      description,
      start,
      end,
    });
    await Planning.create({
      _id: event._id,
      eventName,
      hall,
      description,
      start,
      end,
    });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update events
const updateEvent = async (req, res) => {
  const { eventName, hall, description, start, end } = req.body;

  const previews = await Planning.find({
    $and: [
      {
        $or: [
          {
            $and: [
              { start: { $lte: req.body.end } },
              { end: { $gte: req.body.end } },
            ],
          },
          {
            $and: [
              { start: { $lte: req.body.start } },
              { end: { $gte: req.body.start } },
            ],
          },
        ],
      },
      { _id: { $ne: req.params.id } },
    ],
  });

  console.log(previews);

  if (previews[0]) {
    let err = [];
    previews.forEach((preview) => {
      if (hall == preview.hall) err.push({ hall: "salle déjà occupée" });
    });
    if (err[0]) return res.status(400).json(err);
  }

  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        eventName,
        hall,
        description,
        start,
        end,
      },
      { new: true, upsert: true }
    );
    await Planning.findByIdAndUpdate(
      req.params.id,
      {
        eventName,
        hall,
        description,
        start,
        end,
      },
      { new: true, upsert: true }
    );
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete class
const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    await Planning.findByIdAndDelete(req.params.id);
    res.status(200).json({ Message: "Event deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { getEvent, getEvents, createEvent, updateEvent, deleteEvent };
