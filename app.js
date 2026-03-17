import express from 'express';

import { PORT, HOSTNAME } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Subscription Tracker API server up and running at http://${HOSTNAME}:${PORT}`);
});

export default app;
