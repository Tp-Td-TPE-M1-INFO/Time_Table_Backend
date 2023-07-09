const router = require('express').Router();
const {getClass, getClasses, createClass, updateClass, deleteClass} = require('../controllers/class.controller');

router.route('/class').get(getClasses).post(createClass);

router.route('/class/:id').get(getClass).put(updateClass).delete(deleteClass);

module.exports = router;