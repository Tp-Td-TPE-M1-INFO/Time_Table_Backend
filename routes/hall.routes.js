const router = require('express').Router();
const { getHalls, getHall, createHall, updateHall, deleteHall } = require('../controllers/hall.controller.js');

router.get ('/hall/allHalls', getHalls)
router.get ('/hall/:id', getHall)
router.post ('/hall/create', createHall)
router.patch ('/hall/update/:id', updateHall)
router.delete('/hall/delete/:id', deleteHall)

module.exports = router;