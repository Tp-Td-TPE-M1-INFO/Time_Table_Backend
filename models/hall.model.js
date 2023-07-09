const mongoose = require('mongoose')

const HallSchema = new mongoose.Schema({
    hallName:{
        type : String,
        required: true,
        unique: true
    },
    capacity: {
        type : Number,
        required: true
    },
},
{
    timestamps: true
}
)
const Hall = mongoose.model('Hall', HallSchema)

module.exports = Hall