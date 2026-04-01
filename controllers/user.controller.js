import User from '../models/user.model.js';
import Subscription from '../models/subscription.model.js';
import AppError from '../utils/AppError.js';

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUserSubscriptions = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    if (req.user._id !== req.params.id) {
      throw new AppError('You are not authorized to access this account', 401);
    }

    // eslint-disable-next-line no-underscore-dangle
    const subscriptions = await Subscription.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, getUserById, getUserSubscriptions };
