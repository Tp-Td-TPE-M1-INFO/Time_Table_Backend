const router = require('express').Router();
const {getPlanningTeacher, getPlanningHall, getPlanningClass, getPlanning} = require('../controllers/planning.controller');

router.get('/planning', getPlanning);
router.get('/planning/hall/:id', getPlanningHall);
router.get('/planning/teacher/:id', getPlanningTeacher);
router.get('/planning/class/:id', getPlanningClass);

module.exports = router;