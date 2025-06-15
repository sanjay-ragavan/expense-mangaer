const { Expense, Budget } = require('../models/Expense');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

// Get all expenses with optional filtering
exports.getExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category, search } = req.query;
    const where = {};

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [startDate, endDate]
      };
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.description = {
        [Op.iLike]: `%${search}%`
      };
    }

    const expenses = await Expense.findAll({
      where,
      order: [['date', 'DESC']],
      limit: parseInt(req.query.limit) || 50,
      offset: parseInt(req.query.offset) || 0
    });

    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get a specific expense
exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    await expense.update(req.body);
    res.json(expense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    await expense.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get expense summary by category
exports.getExpenseSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = {};

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [startDate, endDate]
      };
    }

    const summary = await Expense.findAll({
      attributes: [
        'category',
        [sequelize.fn('SUM', sequelize.col('amount')), 'total']
      ],
      where,
      group: ['category'],
      order: [[sequelize.fn('SUM', sequelize.col('amount')), 'DESC']]
    });

    res.json(summary);
  } catch (error) {
    console.error('Error fetching expense summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get or set budget
exports.getBudget = async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const budget = await Budget.findOne({
      where: {
        month: {
          [Op.startsWith]: currentMonth
        }
      }
    });
    res.json(budget || { amount: 0 });
  } catch (error) {
    console.error('Error fetching budget:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.setBudget = async (req, res) => {
  try {
    const { amount } = req.body;
    const currentMonth = new Date().toISOString().slice(0, 7);

    const [budget] = await Budget.upsert({
      month: currentMonth,
      amount
    });

    res.json(budget);
  } catch (error) {
    console.error('Error setting budget:', error);
    res.status(400).json({ error: error.message });
  }
}; 