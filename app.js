import express from 'express';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// Global error handler - must be at the last
app.use(errorHandler);

export default app;
