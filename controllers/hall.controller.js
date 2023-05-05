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
    await Hall.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateHall = (async (req, res) => {
    await Hall.findOneAndUpdate( 
        req.params.hallID, 
        req.body,
        { new: true, runValidators: true }
    )
    .then(result => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: 'Hall not found' }))
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