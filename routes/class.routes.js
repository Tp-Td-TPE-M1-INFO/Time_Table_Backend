const class_router = require('express').Router();
const {getClass, getClasses, createClass, updateClass, deleteClass} = require('../controllers/class.controller');

class_router.route('/class').get(getClasses).post(createClass);

class_router.route('/class/:id').get(getClass).put(updateClass).delete(deleteClass);

module.exports = class_router;