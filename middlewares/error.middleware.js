import mongoose from 'mongoose';

// Invalid MongoDB ID format in URL param
// mongoose.Error.CastError
// Status 400
function handleMongooseCastError(err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return {
    statusCode: 400,
    message,
  };
}

// MongoDB duplicate key error
// MongoDB error code 11000
// Status 409
function handleMongooseDuplicateKeyError(err) {
  const field = Object.keys(err.keyValue)[0];
  const message = `${field} already exists. Please use a different value.`;
  return {
    statusCode: 409,
    message,
  };
}

// MongoDB schema validations failed
// mongoose.Error.ValidationError
// Status 400
function handleMongooseValidationError(err) {
  const messages = Object.values(err.errors).map((e) => e.message);
  const message = `Validation failed: ${messages.join('. ')}`;

  return {
    statusCode: 400,
    message,
  };
}

// Invalid/malformed JWT token
// Status 401
function handleJWTError() {
  return {
    statusCode: 401,
    message: 'Invalid token. Please log in again.',
  };
}

// JWT token has expired
// Status 401
function handleJWTExpiredError() {
  return {
    statusCode: 401,
    message: 'Your token has expired. Please log in again.',
  };
}

const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof mongoose.Error.CastError) {
    ({ statusCode, message } = handleMongooseCastError(err));
  } else if (err.code === 11000) {
    ({ statusCode, message } = handleMongooseDuplicateKeyError(err));
  } else if (err instanceof mongoose.Error.ValidatorError) {
    ({ statusCode, message } = handleMongooseValidationError(err));
  } else if (err.name === 'JsonWebTokenError') {
    ({ statusCode, message } = handleJWTError());
  } else if (err.name === 'TokenExpiredError') {
    ({ statusCode, message } = handleJWTExpiredError());
  }

  // Log stack trace in development only - never in production
  if (process.env.APP_ENV === 'development') {
    console.error(`[${req.method}] ${req.path} - ${err.stack}`);
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    // Include stack trace in development only - never in production
    ...(process.env.APP_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
