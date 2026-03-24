import { config } from 'dotenv';

config({
  path: `.env.${process.env.APP_ENV || 'development'}.local`,
});

export const { APP_ENV, PORT, HOSTNAME, MONGO_DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
