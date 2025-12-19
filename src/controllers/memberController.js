const Member = require('../models/Member');

// Create a new member
const createMember = async (req, res) => {
    try {
        const newMember = new Member(req.body);
        const savedMember = await newMember.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).json({ message: 'Error creating member', error });
    }
};

// Get all members
const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching members', error });
    }
};

// Get member by ID
const getMemberById = async (req, res) => {
    try {
        const member = await Member.findOne({ member_id: req.params.id });
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching member', error });
    }
};

module.exports = { createMember, getAllMembers, getMemberById };