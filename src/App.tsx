import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Fab
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import BudgetForm from './components/BudgetForm';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import CategoryChart from './components/CategoryChart';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    }
  }
});

const App: React.FC = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Expense Manager
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <BudgetForm />
        <CategoryChart />
        <ExpenseList />

        {showExpenseForm && (
          <ExpenseForm
            onSuccess={() => setShowExpenseForm(false)}
            onCancel={() => setShowExpenseForm(false)}
          />
        )}

        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setShowExpenseForm(true)}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16
          }}
        >
          <AddIcon />
        </Fab>
      </Container>
    </ThemeProvider>
  );
};

export default App; 