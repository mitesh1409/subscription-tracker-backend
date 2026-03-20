import mongoose from 'mongoose';

import { MONGO_DB_URI } from '../config/env.js';

if (!MONGO_DB_URI) {
  throw new Error(
    'Please define the MONGO_DB_URI environment variable inside .env.<production/development>.local'
  );
}

function logError(error) {
  console.error('DB Connection Error -', error.message || error);
}

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_DB_URI);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}

// Connection event listeners:
// connected, disconnected, error
mongoose.connection.on('connected', () => console.log('MongoDB connected successfully!'));
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected.'));
mongoose.connection.on('error', (error) => {
  logError(error);
  process.exit(1);
});

export default connectToDatabase;
