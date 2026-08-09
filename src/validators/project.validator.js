const {z}= require('zod');
const createProjectSchema = z.object({
  name: z.string().min(1, { message: 'Project name is required' }),
  description: z.string().optional(),
});
const updateProjectSchema = z.object({
  name: z.string().min(1, { message: 'Project name is required' }).optional(),
  description: z.string().optional(),
});
module.exports = { createProjectSchema, updateProjectSchema };