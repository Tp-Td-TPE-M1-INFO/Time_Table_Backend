const router = require('express').Router();
const {getCourse, getCourses, createCourse, updateCourse, deleteCourse} = require('../controllers/course.controller');

router.get('/course/getCourses', getCourses);
router.get('/course/getCourse/:id', getCourse);
router.post('/course/create', createCourse);
router.patch('/course/update/:id', updateCourse);
router.delete('/course/delete/:id', deleteCourse);

module.exports = router;