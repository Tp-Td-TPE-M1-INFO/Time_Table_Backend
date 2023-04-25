const Hall = require('../models/hall.model.js')

const getHalls = ((req, res) => {
    Hall.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({ msg: error }))
})

const getHall = ((req, res) => {
    Hall.findOne({ _id: req.params.hallID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({ msg: 'Hall not found' }))
})

const createHall = ((req, res) => {
    Hall.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateHall = ((req, res) => {
    Hall.findOneAndUpdate({ _id: req.params.hallID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({ msg: 'Hall not found' }))
})

const deleteHall = ((req, res) => {
    Hall.findOneAndDelete({ _id: req.params.hallID })
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