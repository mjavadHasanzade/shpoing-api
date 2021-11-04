const { getAll, getOne } = require('../controllers/product');
const router = require('express').Router();
const pagination = require('../middlewars/pagination');

router.get('/', pagination, getAll);
router.get('/:id', pagination, getOne);

module.exports = router;