import express from 'express';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import errorHandler from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

// Middlewares

// Parse incoming requests with JSON payloads (Content-Type: application/json)
app.use(express.json());

// Parse incoming requests with URL-encoded payloads (Content-Type: application/x-www-form-urlencoded)
// extended: true allows parsing of nested objects using the qs library
app.use(express.urlencoded({ extended: true }));

// Parse Cookie header and populate req.cookies with an object keyed by cookie names
app.use(cookieParser());

app.use(arcjetMiddleware);

// Routes

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// 404 handler — catches requests to routes that don't exist
// Must be after all routes so it only triggers if no route matched
app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Global error handler — must be registered last
// Catches all errors forwarded via next(err) from anywhere in the app
app.use(errorHandler);

export default app;
