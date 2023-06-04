const router = require('express').Router();
const {register, login, getTeacher, updateTeacher, deleteTeacher, getAllTeachers, profil, deleteProfil } = require('../controllers/teacher.controller');
const {protect} = require('../middlewares/protect')
const upload = require('../middlewares/upload')

router.post('/teacher/register', register);
router.get('/teacher/info/:id',protect, getTeacher)
router.get('/teacher/all', protect, getAllTeachers)
router.patch('/teacher/update',protect, updateTeacher)
router.delete('/teacher/delete', protect, deleteTeacher)
router.patch('/teacher/profil', protect,upload, profil)
router.patch('/teacher/deleteProfil', protect,deleteProfil)

module.exports = router;