const {z}= require('zod');
const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: 'Project name is required' }),
    description: z.string().optional(),
    status: z.enum(['ACTIVE', 'ARCHIVED', 'DELETED']).default('ACTIVE'),
  }),
  params: z.object({
    workspaceId: z.string().uuid(),
  })
});
const updateProjectSchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: 'Project name is required' }).optional(),
    description: z.string().optional(),
    status: z.enum(['ACTIVE', 'ARCHIVED', 'DELETED']).optional(),
  }),
  params: z.object({
    workspaceId: z.string().uuid(),
    projectId: z.string().uuid(),
  })
});
module.exports = { createProjectSchema, updateProjectSchema }