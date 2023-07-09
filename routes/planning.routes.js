const router = require('express').Router();
const {getPlanningTeacher, getPlanningHall, getPlanningClass, getPlanning} = require('../controllers/planning.controller');

router.get('/planning', getPlanning);
router.get('/planning/:id', getPlanningHall);
router.get('/planning/:id', getPlanningTeacher);
router.get('/planning/:id', getPlanningClass);

module.exports = router;