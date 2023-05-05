const router = require('express').Router();
const {register, login, getStudent, updateStudent, deleteStudent, getAllStudents, profil, deleteProfil } = require('../controllers/student.controller');
const {protect} = require('../middlewares/studentAuth');
const upload = require('../middlewares/upload');


router.post('/student/register', register);
router.post('/student/login', login);
router.get('/student/info/:id', getStudent)
router.get('/student/all', getAllStudents)
router.patch('/student/update',protect, updateStudent)
router.delete('/student/delete', protect, deleteStudent)
router.patch('/student/profil/:id', protect, upload, profil)
router.patch('/student/deleteProfil/:id',protect, deleteProfil)

module.exports = router;
