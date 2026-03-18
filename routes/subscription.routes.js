import { Router } from 'express';

const subscriptionRouter = Router();

// Get subscriptions with upcoming renewals
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.json({
    route: `GET /subscriptions/upcoming-renewals - get subscriptions with upcoming renewals`,
  });
});

// Create
subscriptionRouter.post('/', (req, res) => {
  res.json({
    route: 'POST /subscriptions - create a subscription',
  });
});

// Read
subscriptionRouter.get('/', (req, res) => {
  res.json({
    route: 'GET /subscriptions - get all the subscriptions',
  });
});

subscriptionRouter.get('/:id', (req, res) => {
  res.json({
    route: `GET /subscriptions/:id - get subscription by id: ${req.params.id}`,
  });
});

// Update
subscriptionRouter.put('/:id', (req, res) => {
  res.json({
    route: `PUT /subscriptions/:id - update subscription by id: ${req.params.id}`,
  });
});

// Delete
subscriptionRouter.delete('/:id', (req, res) => {
  res.json({
    route: `DELETE /subscriptions/:id - delete subscription by id: ${req.params.id}`,
  });
});

// Cancel a subscription
subscriptionRouter.put('/:id/cancel', (req, res) => {
  res.json({
    route: `PUT /subscriptions/:id - cancel subscription by id: ${req.params.id}`,
  });
});

export default subscriptionRouter;
