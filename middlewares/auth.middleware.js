import * as jwt from '../services/jwt.js';

function authenticate(req, res, next) {
  const token = req.cookies?.token;
  req.user = token ? jwt.getUser(token) : null;
  next();
}

export default authenticate;
