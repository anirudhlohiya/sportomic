const express = require('express');
const { createMember, getAllMembers, getMemberById } = require('../controllers/memberController');

const router = express.Router();

// Routes for Members
router.post('/', createMember);
router.get('/', getAllMembers);
router.get('/:id', getMemberById);

module.exports = router;