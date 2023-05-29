const sector_router = require('express').Router();
const {getSector, getSectors, createSector, updateSector, deleteSector} = require('../controllers/sector.controller');

sector_router.route('/sector').get(getSectors).post(createSector);

sector_router.route('/sector/:id').get(getSector).put(updateSector).delete(deleteSector);

module.exports = sector_router;