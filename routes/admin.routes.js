const router = require('express').Router();
const {addAdmin, getAdmin, updateAdmin, deleteAdmin, getAllAdmins, profil, deleteProfil } = require('../controllers/admin.controller');
const {protect} = require('../middlewares/protect')
const upload = require('../middlewares/upload')

router.post('/admin/register', addAdmin);
router.get('/admin/info', getAdmin)
router.get('/admin/all', getAllAdmins)
router.patch('/admin/update', updateAdmin)
router.delete('/admin/delete', deleteAdmin)
router.patch('/admin/profil',upload, profil)
router.patch('/admin/deleteProfil',deleteProfil)

module.exports = router;