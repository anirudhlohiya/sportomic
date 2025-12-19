const express = require('express');
const {
    createTransaction,
    getAllTransactions,
    getTransactionById
} = require('../controllers/transactionController');

const router = express.Router();

// Route: Create a new transaction
router.post('/', createTransaction);

// Route: Get all transactions
router.get('/', getAllTransactions);

// Route: Get a transaction by ID
router.get('/:id', getTransactionById);

module.exports = router;