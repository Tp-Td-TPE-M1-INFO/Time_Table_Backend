const router = require('express').Router();
const {addTeacher, getTeacher, updateTeacher, deleteTeacher, getAllTeachers, profil, deleteProfil } = require('../controllers/teacher.controller');
const {protect} = require('../middlewares/protect')
const upload = require('../middlewares/upload')

router.post('/teacher/register', addTeacher);
router.get('/teacher/info/:id', getTeacher)
router.get('/teacher/all', getAllTeachers)
router.patch('/teacher/update', updateTeacher)
router.delete('/teacher/delete/:id', deleteTeacher)
router.patch('/teacher/profil',upload, profil)
router.patch('/teacher/deleteProfil',deleteProfil)

module.exports = router;
