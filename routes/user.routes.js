import { Router } from 'express';

import { getAllUsers, getUserById, getUserSubscriptions } from '../controllers/user.controller.js';
import authorize from '../middlewares/authorize.middleware.js';

const userRouter = Router();

// Create
userRouter.post('/', (req, res) => {
  res.json({
    route: 'POST /users - create a user',
  });
});

// Read
// GET /users - Get all the users
userRouter.get('/', authorize, getAllUsers);

// GET /users/:id - Get user by id
userRouter.get('/:id', authorize, getUserById);

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

// Get a sub-resource - Get all the subscriptions for a user
// GET /users/:id/subscriptions - Get all the subscriptions for the user with id: id
userRouter.get('/:id/subscriptions', authorize, getUserSubscriptions);

export default userRouter;
