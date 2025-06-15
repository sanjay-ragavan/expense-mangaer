import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { getExpenseSummary } from '../api/api';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const CategoryChart: React.FC = () => {
  const [summary, setSummary] = useState<Array<{ category: string; total: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await getExpenseSummary();
      setSummary(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch expense summary');
      console.error('Error fetching expense summary:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: summary.map((item) => item.category),
    datasets: [
      {
        data: summary.map((item) => item.total),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.error.main,
          theme.palette.warning.main,
          theme.palette.info.main,
          theme.palette.success.main,
          theme.palette.grey[500]
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const
      },
      title: {
        display: true,
        text: 'Expenses by Category'
      }
    }
  };

  const barData = {
    labels: summary.map((item) => item.category),
    datasets: [
      {
        label: 'Amount',
        data: summary.map((item) => item.total),
        backgroundColor: theme.palette.primary.main
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Expenses by Category'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value}`
        }
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="body1" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Expense Summary
      </Typography>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
        <Box flex={1}>
          <Pie data={chartData} options={chartOptions} />
        </Box>
        <Box flex={1}>
          <Bar data={barData} options={barOptions} />
        </Box>
      </Box>
    </Paper>
  );
};

export default CategoryChart; 