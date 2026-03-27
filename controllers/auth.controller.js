import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import setJwt from '../services/jwt.js';
import isProdEnv from '../services/utils.js';

const signUp = async (req, res, next) => {
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    // Create a new user

    // Get user data from the request body
    const { firstName, lastName, email, password } = req.body;

    // Check if a user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError('User already exists', 409);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
      {
        session: dbSession,
      }
    );

    const token = setJwt(newUser);

    await dbSession.commitTransaction();
    dbSession.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    await dbSession.abortTransaction();
    dbSession.endSession();
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = setJwt(user);

    // Set the token as a cookie in the response.
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// eslint-disable-next-line no-unused-vars
const signOut = async (req, res, next) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProdEnv(),
    sameSite: 'strict',
  });

  res.status(200).json({
    success: true,
    message: 'Signed out successfully',
  });
};

export { signUp, signIn, signOut };
