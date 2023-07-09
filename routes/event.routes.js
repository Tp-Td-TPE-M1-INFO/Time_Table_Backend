const router = require('express').Router();
const {getOtherEvent, getOtherEvents, createOtherEvent, updateOtherEvent, deleteOtherEvent} = require('../controllers/event.controller');

router.get('/otherEvent/getOtherEvents', getOtherEvents);
router.get('/otherEvent/getOtherEvent/:id', getOtherEvent);
router.post('/otherEvent/create', createOtherEvent);
router.patch('/otherEvent/update/:id', updateOtherEvent);
router.delete('/otherEvent/delete/:id', deleteOtherEvent);

module.exports = router;