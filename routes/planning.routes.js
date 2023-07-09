const router = require('express').Router();
const {getPlanningTeacher, getPlanningHall, getPlanningClass} = require('../controllers/planning.controller');

router.get('/plannig/:hallId', getPlanningHall);
router.get('/plannig/:TeacherId', getPlanningTeacher);
router.get('/plannig/:classId', getPlanningClass);

module.exports = router;