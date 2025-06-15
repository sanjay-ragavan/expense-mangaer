import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  amount: number;
  month: string;
}

export interface ExpenseSummary {
  category: string;
  total: number;
}

export const getExpenses = async (params?: {
  startDate?: string;
  endDate?: string;
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) => {
  const response = await api.get<Expense[]>('/expenses', { params });
  return response.data;
};

export const createExpense = async (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
  const response = await api.post<Expense>('/expenses', expense);
  return response.data;
};

export const updateExpense = async (id: string, expense: Partial<Expense>) => {
  const response = await api.put<Expense>(`/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  await api.delete(`/expenses/${id}`);
};

export const getExpenseSummary = async (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  const response = await api.get<ExpenseSummary[]>('/expenses/summary', { params });
  return response.data;
};

export const getBudget = async () => {
  const response = await api.get<Budget>('/budget');
  return response.data;
};

export const setBudget = async (amount: number) => {
  const response = await api.post<Budget>('/budget', { amount });
  return response.data;
}; 