const router = require('express').Router();
const {getPlanningTeacher, getPlanningHall, getPlanningClass} = require('../controllers/planning.controller');

router.get('/planning/:id', getPlanningHall);
router.get('/planning/:id', getPlanningTeacher);
router.get('/planning/:id', getPlanningClass);

module.exports = router;