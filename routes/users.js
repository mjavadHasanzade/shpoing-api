const { getAll, getOne, createOne, editOne, deleteOne } = require('../controllers/user');
const router = require('express').Router();
const pagination = require('../middlewars/pagination');

router.get('/', pagination, getAll);
router.get('/:id', getOne);
router.post('/', createOne);
router.put('/:id', editOne);
router.delete('/:id', deleteOne);

module.exports = router;