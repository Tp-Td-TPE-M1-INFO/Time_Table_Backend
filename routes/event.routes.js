const router = require('express').Router();
const {getEvent, getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/event.controller');

router.get('/event/getEvents', getEvents);
router.get('/event/getEvent/:id', getEvent);
router.post('/event/create', createEvent);
router.patch('/event/update/:id', updateEvent);
router.delete('/event/delete/:id', deleteEvent);

module.exports = router;