import User from '../models/user.model.js';
import * as jwt from '../services/jwt.js';
import AppError from '../utils/AppError.js';

const authorize = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(' ')[1];
  }

  try {
    if (!token) {
      throw new AppError('User authorization failed. Reason - token missing.', 401);
    }

    const userData = jwt.getUser(token);

    if (!userData) {
      throw new AppError('User authorization failed. Reason - token verification failed.', 401);
    }

    const user = await User.findById(userData.id);

    if (!user) {
      throw new AppError('User authorization failed. Reason - user not found.', 401);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authorize;
