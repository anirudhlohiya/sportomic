const express = require('express');
const { createTransaction, getAllTransactions, getTransactionById } = require('../controllers/transactionController');

const router = express.Router();

// Routes for Transactions
router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);

module.exports = router;