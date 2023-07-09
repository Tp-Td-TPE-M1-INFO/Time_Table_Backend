const router = require('express').Router();
const {getSector, getSectors, createSector, updateSector, deleteSector} = require('../controllers/sector.controller');

router.route('/sector').get(getSectors).post(createSector);

router.route('/sector/:id').get(getSector).put(updateSector).delete(deleteSector);

module.exports = router;