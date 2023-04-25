const router = require('express').Router();
const {getUE, createUE, get_one_UE, updateUE, deleteUE} = require('../controllers/ue.controller');

router.route('/ue').get(getUE).post(createUE);

router.route('/ue/:id').get(get_one_UE).put(updateUE).get(deleteUE);

module.exports = router;