import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

function setJwt(userData) {
  const payload = {
    // eslint-disable-next-line no-underscore-dangle
    id: userData._id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function getUser(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Failed to verify JWT token:', token);
    console.error(error);
    return null;
  }
}

export { setJwt, getUser };
