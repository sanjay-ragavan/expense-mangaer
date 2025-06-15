require('dotenv').config();
const { app, startServer } = require('./app');
const { testConnection } = require('./config/db');

const PORT = process.env.PORT || 3001;

// Test database connection and start server
const start = async () => {
  try {
    await testConnection();
    await startServer();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start(); 