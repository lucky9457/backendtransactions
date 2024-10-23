// routes/transactions.js

const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getAllTransactions);
router.post('/', transactionController.addTransaction);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);
router.get('/summary', transactionController.getSummary);


router.get('/categories', transactionController.getAllCategories);
router.post('/categories', transactionController.addCategory);
router.put('/categories/:id', transactionController.updateCategory);
router.delete('/categories/:id', transactionController.deleteCategory);

module.exports = router;
