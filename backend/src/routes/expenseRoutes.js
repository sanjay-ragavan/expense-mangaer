const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Expense routes
router.get('/expenses', expenseController.getExpenses);
router.post('/expenses', expenseController.createExpense);
router.get('/expenses/:id', expenseController.getExpense);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);

// Summary routes
router.get('/expenses/summary', expenseController.getExpenseSummary);

// Budget routes
router.get('/budget', expenseController.getBudget);
router.post('/budget', expenseController.setBudget);

module.exports = router; 