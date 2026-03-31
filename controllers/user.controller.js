import User from '../models/user.model.js';

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllUsers;
