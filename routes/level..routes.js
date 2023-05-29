const level_router = require('express').Router();
const {getLevel, getLevels, createLevel, updateLevel, deleteLevel} = require('../controllers/level.controller');

level_router.route('/level').get(getLevels).post(createLevel);

level_router.route('/level/:id').get(getLevel).put(updateLevel).delete(deleteLevel);

module.exports = level_router;