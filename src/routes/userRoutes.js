const express = require('express');
const { getUsers, getUserById, createUser } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUserById);

module.exports = router;