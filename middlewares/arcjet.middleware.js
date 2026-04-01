import aj from '../config/arcjet.js';
import AppError from '../utils/AppError.js';

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new AppError('Rate limit exceeded', 429);
      }

      if (decision.reason.isBot()) {
        throw new AppError('Bot detected', 403);
      }

      throw new AppError('Access denied', 403);
    }

    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;
