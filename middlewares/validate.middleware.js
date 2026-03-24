import AppError from '../utils/AppError.js';

const validate = (schema) => (req, res, next) => {
  // safeParse() never throws — returns { success, data } or { success, error }
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // error.issues contains the array of all validation errors
    const errorMessages = result.error.issues.map((issue) => issue.message).join(', ');
    return next(new AppError(errorMessages, 400));
  }

  // result.data contains the validated and transformed data
  // (trimmed, lowercased etc. as defined in the Zod schema)
  // Overwrite req.body so the controller receives clean data
  req.body = result.data;
  next();
};

export default validate;
