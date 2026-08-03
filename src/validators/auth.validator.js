const { z } = require('zod');
const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters').max(255),
    email: z.email('Invalid email address').trim().toLowerCase().max(255),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/)
  })
  });
const loginSchema = z.object({
  body: z.object({
    email: z.email('Invalid email address').trim().toLowerCase().max(255),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/)
  })
});
module.exports = {registerSchema, loginSchema};