const router = require('express').Router();
const {register, getStudent, updateStudent, deleteStudent, getAllStudents, profil, deleteProfil } = require('../controllers/student.controller');
const {protect} = require('../middlewares/protect');
const upload = require('../middlewares/upload');

router.post('/student/register', register);
router.get('/student/get_student', protect, getStudent)
router.get('/student/all', getAllStudents)
router.patch('/student/update', updateStudent)
router.delete('/student/delete', deleteStudent)
router.patch('/student/profil/:id', upload, profil)
router.patch('/student/deleteProfil/:id', deleteProfil)

module.exports = router;
