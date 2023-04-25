const router = require('express').Router();
const {register, login} = require('../controllers/auth.controller');

router.post('/student/register', register);
router.post('/student/login', login);

module.exports = router;