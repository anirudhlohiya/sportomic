const Transaction = require('../models/Transaction');

// Controller: Create a new transaction
const createTransaction = async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error });
    }
};

// Controller: Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};

// Controller: Get a transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ transaction_id: req.params.id });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction', error });
    }
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById
};