const { z } = require('zod');
const workspaceBody = z.object({
  name: z.string().min(3).max(255),
  description: z.string().max(500).optional(),
});

const createWorkspaceSchema = z.object({
  body: workspaceBody,
});

const workspaceIdSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});

const updateWorkspaceSchema = z.object({
  body: workspaceBody.partial(),
});
module.exports = { createWorkspaceSchema, updateWorkspaceSchema,workspaceIdSchema};