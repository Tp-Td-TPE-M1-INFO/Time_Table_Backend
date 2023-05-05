const router = require('express').Router();
const {register, login, getTeacher, updateTeacher, deleteTeacher, getAllTeachers, profil, deleteProfil } = require('../controllers/teacher.controller');
const {protect} = require('../middlewares/teacherAuth')
const upload = require('../middlewares/upload')

router.post('/teacher/register', register);
router.post('/teacher/login', login);
router.get('/teacher/info/:id', getTeacher)
router.get('/teacher/all', getAllTeachers)
router.patch('/teacher/update',protect, updateTeacher)
router.delete('/teacher/delete', protect, deleteTeacher)
router.patch('/teacher/profil/:id', protect,upload, profil)
router.patch('/teacher/deleteProfil/:id', protect,deleteProfil)

module.exports = router;