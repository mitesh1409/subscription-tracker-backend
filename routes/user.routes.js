import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/user.controller.js';
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
userRouter.get('/:id', getUserById);

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
