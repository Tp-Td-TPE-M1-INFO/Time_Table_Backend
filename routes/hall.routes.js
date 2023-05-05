const router = require('express').Router();
const { getHalls, getHall, createHall, updateHall, deleteHall } = require('../controllers/hall.controller.js');

router.get ('/hall/allHalls', getHalls)
router.get ('/hall/:hallID', getHall)
router.post ('/hall/create', createHall)
router.patch ('/hall/update/:hallID', updateHall)
router.delete('/hall/delete/:hallID', deleteHall)

module.exports = router;