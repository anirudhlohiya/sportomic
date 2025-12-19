const express = require('express');
const {
    createMember,
    getAllMembers,
    getMemberById
} = require('../controllers/memberController');

const router = express.Router();

// Route: Create a new member
router.post('/', createMember);

// Route: Get all members
router.get('/', getAllMembers);

// Route: Get a member by ID
router.get('/:id', getMemberById);

module.exports = router;