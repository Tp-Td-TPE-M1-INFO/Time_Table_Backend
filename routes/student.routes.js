const router = require('express').Router();
const {register, login, getStudent, updateStudent, deleteStudent, getAllStudents, profil, deleteProfil } = require('../controllers/student.controller');
const {protect} = require('../middlewares/protect');
const upload = require('../middlewares/upload');

router.post('/student/register', register);
router.get('/student/info/:id', protect, getStudent)
router.get('/student/all', protect, getAllStudents)
router.patch('/student/update',protect, updateStudent)
router.delete('/student/delete', protect, deleteStudent)
router.patch('/student/profil/:id', protect, upload, profil)
router.patch('/student/deleteProfil/:id',protect, deleteProfil)

module.exports = router;
