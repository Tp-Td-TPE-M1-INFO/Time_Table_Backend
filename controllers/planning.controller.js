const Planning = require('../models/planning.model')

const getPlanning = (async (req, res) => {
    try{
        const planning = await Planning.find()
        .populate("ue")
        .populate("hall")
        .populate("classe")
        .populate("teacher")
        .exec();
        res.status(200).json(planning);
    }
    catch(err){
        res.status(400).json(err);
    }
});

const getPlanningClass = (async (req, res) =>{
    try{
        const planningClass = await Planning.find({classe : req.params.id})
        .populate("ue")
        .populate("hall")
        .populate("classe")
        .populate("teacher")
        .exec();
        res.status(200).json(planningClass);
    }  
    catch(err){
        res.status(500).json(err)
    }
});

const getPlanningHall = (async (req, res) =>{
    try{
        const planningHall = await Planning.find({hall : req.params.id})
        .populate("ue")
        .populate("hall")
        .populate("classe")
        .populate("teacher")
        .exec();
        res.status(200).json(planningHall);
    }  
    catch(err){
        res.status(500).json(err)
    }
});

const getPlanningTeacher = (async (req, res) =>{
    try{
        const planningTeacher = await Planning.find({teacher : req.params.id})
        .populate("ue")
        .populate("hall")
        .populate("classe")
        .populate("teacher")
        .exec();
        res.status(200).json(planningTeacher);
    }  
    catch(err){
        res.status(500).json(err)
    }
});

module.exports = { getPlanningClass, getPlanningHall, getPlanningTeacher, getPlanning}