import express from 'express';

import { PORT, HOSTNAME } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/subscriptions', subscriptionRouter);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Subscription Tracker API server up and running at http://${HOSTNAME}:${PORT}`);
});

export default app;
