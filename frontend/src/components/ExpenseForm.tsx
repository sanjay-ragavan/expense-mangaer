import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Expense, createExpense, updateExpense } from '../api/api';

const categories = [
  'Food',
  'Transport',
  'Housing',
  'Utilities',
  'Entertainment',
  'Investment',
  'Other'
];

interface ExpenseFormProps {
  expense?: Expense;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expense,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<Expense>>({
    amount: expense?.amount || 0,
    description: expense?.description || '',
    category: expense?.category || categories[0],
    date: expense?.date || new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (expense?.id) {
        await updateExpense(expense.id, formData);
      } else {
        await createExpense(formData as Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>);
      }
      onSuccess?.();
    } catch (err) {
      setError('Failed to save expense');
      console.error('Error saving expense:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Expense) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'amount' ? Number(e.target.value) : e.target.value
    }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {expense ? 'Edit Expense' : 'Add New Expense'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            type="number"
            label="Amount"
            value={formData.amount}
            onChange={handleChange('amount')}
            InputProps={{
              startAdornment: <Typography>$</Typography>
            }}
            required
            fullWidth
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={handleChange('description')}
            required
            fullWidth
          />
          <TextField
            select
            label="Category"
            value={formData.category}
            onChange={handleChange('category')}
            required
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={new Date(formData.date || '')}
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  date: date?.toISOString().split('T')[0] || ''
                }))
              }
            />
          </LocalizationProvider>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Box display="flex" gap={2} justifyContent="flex-end">
            {onCancel && (
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : expense ? (
                'Update Expense'
              ) : (
                'Add Expense'
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default ExpenseForm; 