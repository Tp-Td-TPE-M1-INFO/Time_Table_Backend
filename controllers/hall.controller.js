const Hall = require('../models/hall.model.js')

const getHalls = (async (req, res) => {
    try
    {
        const halls = await Hall.find()
        res.status(200).json(halls)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})

const getHall = (async (req, res) => {
    try{
        const hall = await Hall.findById(req.params.id)
        res.status(200).json({hall})
    }
    catch(err){
        res.status(400).json(err)
    }
})

const createHall = (async (req, res) => {
    const{hallName, capacity} = req.body;
    try{
        const hall = new Hall({hallName, capacity});
        await hall.save();
        res.status(200).json(hall);
    }
    catch(err){
        if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("hallName")){
            res.status(400).send({message: "Hall name is already exit please change the name"});
        }
        else{
            res.status(500).send(err)
        }
    } 
})

const updateHall = (async (req, res) => {
    try{
        const hall = await Hall.findByIdAndUpdate( 
            req.params.id, 
            req.body,
            { new: true, runValidators: true }
        )
        res.status(200).json(hall);
    }
    catch(err){
        if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("hallName")){
            res.status(400).send({message: "Hall name is already exit please change the name"});
        }
        else{
            res.status(500).send(err)
        }
    }
})

const deleteHall = (async (req, res) => {
    await Hall.findOneAndDelete({ _id: req.params.id })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({ msg: error }))
})

module.exports = {
    getHalls,
    getHall,
    createHall,
    updateHall,
    deleteHall
}