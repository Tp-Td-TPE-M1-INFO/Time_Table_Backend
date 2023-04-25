const express = require('express')
const router = express.Router()

const {
    getHalls,
    getHall,
    createHall,
    updateHall,
    deleteHall
} = require('../controllers/hall.controller.js')

router.get('/', getHalls)

router.get('/:hallID', getHall)

router.post('/', createHall)

router.put('/:hallID', updateHall)

router.delete('/:hallID', deleteHall)

module.exports = router