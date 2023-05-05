const Hall = require('../models/hall.model.js')

const getHalls = (async (req, res) => {
    await Hall.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({ msg: error }))
})

const getHall = (async (req, res) => {
    await Hall.findOne({ _id: req.params.hallID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({ msg: 'Hall not found' }))
})

const createHall = (async (req, res) => {
    const{name, capacity} = req.body;
    try{
        const hall = new Hall({name, capacity});
        await hall.save();
        res.status(200).json(hall);
    }
    catch(err){
        if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("name")){
            res.status(400).send({message: "Hall name is already exit please change the name"});
        }
        else{
            res.status(500).send(err)
        }
    }
    
})

const updateHall = (async (req, res) => {
    try{
        const hall = await Hall.findOneAndUpdate( 
            req.params.hallID, 
            req.body,
            { new: true, runValidators: true }
        )
        res.status(200).json(hall);
    }
    catch(err){
        if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("name")){
            res.status(400).send({message: "Hall name is already exit please change the name"});
        }
        else{
            res.status(500).send(err)
        }
    }
})

const deleteHall = (async (req, res) => {
    await Hall.findOneAndDelete({ _id: req.params.hallID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({ msg: 'Hall not found' }))
})

module.exports = {
    getHalls,
    getHall,
    createHall,
    updateHall,
    deleteHall
}