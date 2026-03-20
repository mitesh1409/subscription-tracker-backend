import app from './app.js';
import connectToDatabase from './database/mongodb.js';
import { PORT, HOSTNAME } from './config/env.js';

// Catch synchronous errors before anything starts
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

async function startServer() {
  try {
    // Connect to Database first
    await connectToDatabase();

    // Only start server after Database is ready
    const server = app.listen(PORT, HOSTNAME, () => {
      console.log(`Subscription Tracker API server up and running at http://${HOSTNAME}:${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled Rejection:', reason);
      server.close(() => process.exit(1));
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
