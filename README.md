# Expense Manager

A full-stack expense tracking application built with React, TypeScript, Node.js, Express, and PostgreSQL.

## Project Structure

```
expense-manager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── expenseController.js
│   │   ├── models/
│   │   │   └── Expense.js
│   │   ├── routes/
│   │   │   └── expenseRoutes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BudgetForm.tsx
│   │   │   ├── ExpenseForm.tsx
│   │   │   ├── ExpenseList.tsx
│   │   │   └── CategoryChart.tsx
│   │   ├── api/
│   │   │   └── api.ts
│   │   ├── styles/
│   │   │   └── styles.css
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── .env.example
│   ├── package.json
│   └── README.md
└── README.md
```

## Features

- Net income & budget management
- Real-time remaining budget display
- Expense tracking with categories
- Date range filtering
- Search functionality
- Category-wise expense summary charts
- Responsive design
- Fast database queries with proper indexing

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your PostgreSQL credentials and other configuration.

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will start on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to set the API base URL (default: http://localhost:3001)

4. Start the development server:
   ```bash
   npm start
   ```

The frontend application will start on http://localhost:3000

## Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE expense_manager;
   ```

2. The database tables will be automatically created when you start the backend server.

## API Endpoints

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create a new expense
- `GET /api/expenses/:id` - Get a specific expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense
- `GET /api/expenses/summary` - Get expense summary by category
- `GET /api/budget` - Get current budget
- `POST /api/budget` - Set budget

## Development

- Backend uses Express.js with PostgreSQL
- Frontend uses React with TypeScript
- API communication uses Axios
- Charts are implemented using Chart.js
- Styling uses CSS modules

## Production Deployment

For production deployment:

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Set NODE_ENV to production in backend .env
3. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

## License

MIT 