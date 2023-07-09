const router = require('express').Router();
const {getLevel, getLevels, createLevel, updateLevel, deleteLevel} = require('../controllers/level.controller');

router.route('/level').get(getLevels).post(createLevel);

router.route('/level/:id').get(getLevel).put(updateLevel).delete(deleteLevel);

module.exports = router;