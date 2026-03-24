import * as z from 'zod';

const signUpSchema = z.object({
  firstName: z
    .string({ error: 'First name is required' })
    .min(2, { error: 'First name must be at least 2 characters' })
    .max(50, { error: 'First name must be at most 50 characters' })
    .trim(),

  lastName: z
    .string({ error: 'Last name is required' })
    .min(2, { error: 'Last name must be at least 2 characters' })
    .max(50, { error: 'Last name must be at most 50 characters' })
    .trim(),

  email: z.email({ error: 'Please provide a valid email address' }).trim().toLowerCase(),

  password: z
    .string({ error: 'Password is required' })
    .min(8, { error: 'Password must be at least 8 characters' })
    .max(64, { error: 'Password must be at most 64 characters' })
    .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { error: 'Password must contain at least one number' }),
});

const signInSchema = z.object({
  email: z.email({ error: 'Please provide a valid email address' }).trim().toLowerCase(),

  password: z.string({ error: 'Password is required' }).min(1, { error: 'Password is required' }),
});

export { signUpSchema, signInSchema };
