const {z}= require('zod');
const createProjectSchema = z.object({
  name: z.string().min(3, { message: 'Project name is required' }),
  description: z.string().optional(),
  status: z.enum(['ACTIVE', 'ARCHIVED', 'DELETED']).default('ACTIVE'),
});
const updateProjectSchema = z.object({
  name: z.string().min(3, { message: 'Project name is required' }).optional(),
  description: z.string().optional(),
  status: z.enum(['ACTIVE', 'ARCHIVED', 'DELETED']).optional(),
});
module.exports = { createProjectSchema, updateProjectSchema }