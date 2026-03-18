import { Router } from 'express';

const userRouter = Router();

// Create
userRouter.post('/', (req, res) => {
  res.json({
    route: 'POST /users - create a user',
  });
});

// Read
userRouter.get('/', (req, res) => {
  res.json({
    route: 'GET /users - get all the users',
  });
});

userRouter.get('/:id', (req, res) => {
  res.json({
    route: `GET /users/:id - get user by id: ${req.params.id}`,
  });
});

// Update
userRouter.put('/:id', (req, res) => {
  res.json({
    route: `PUT /users/:id - update user by id: ${req.params.id}`,
  });
});

// Delete
userRouter.delete('/:id', (req, res) => {
  res.json({
    route: `DELETE /users/:id - delete user by id: ${req.params.id}`,
  });
});

// Get a sub-resource - get all the subscriptions for a user
userRouter.get('/:id/subscriptions', (req, res) => {
  res.json({
    route: `GET /users/:id/subscriptions - get all the subscriptions for the user with id: ${req.params.id}`,
  });
});

export default userRouter;
