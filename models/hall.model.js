

const mongoose = require('mongoose')

const HallSchema = new mongoose.Schema({
    name: String,
    capacity: Number,
})

const Hall = mongoose.model('Hall', HallSchema)

module.exports = Hall