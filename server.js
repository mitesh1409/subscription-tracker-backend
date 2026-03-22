import app from './app.js';
import { connectToDatabase, closeDatabaseConnection } from './database/mongodb.js';
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

    // Graceful shutdown function
    async function gracefulShutdown(signal) {
      console.log(`${signal} received. Shutting down gracefully...`);

      // Stop accepting new requests
      server.close(async () => {
        // Do cleanup operations

        // Close database connection
        await closeDatabaseConnection();
        console.log('MongoDB connection closed.');

        console.log('Graceful shutdown complete.');
        process.exit(0);
      });

      // Safety net — force exit if graceful shutdown takes too long
      // This handles the case where server.close() hangs due to
      // keep-alive connections that never close
      setTimeout(() => {
        console.error('Graceful shutdown timed out. Forcing exit.');
        process.exit(1);
      }, 10000); // 10 seconds — should finish well before Docker's SIGKILL
    }

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled Rejection:', reason);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
