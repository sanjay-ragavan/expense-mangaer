import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import { getBudget, setBudget } from '../api/api';

const BudgetForm: React.FC = () => {
  const [budget, setBudgetState] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const data = await getBudget();
      setBudgetState(data.amount);
      setError(null);
    } catch (err) {
      setError('Failed to fetch budget');
      console.error('Error fetching budget:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await setBudget(budget);
      setError(null);
    } catch (err) {
      setError('Failed to update budget');
      console.error('Error updating budget:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Monthly Budget
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            type="number"
            label="Budget Amount"
            value={budget}
            onChange={(e) => setBudgetState(Number(e.target.value))}
            InputProps={{
              startAdornment: <Typography>$</Typography>
            }}
            error={!!error}
            helperText={error}
            disabled={loading}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Update Budget
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default BudgetForm; 