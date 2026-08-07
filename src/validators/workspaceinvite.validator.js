const {z} =require('zod');
const updateWorkspaceInviteSchema=z.object({
    params:z.object({
        inviteId:z.string().uuid()
    }),
    body:z.object({
        status:z.enum(['ACCEPTED','REJECTED'])})
});
const addWorkspaceMemberSchema=z.object({
  params:z.object({
    workspaceId:z.string().uuid(),
  }),
  body:z.object({
    email:z.string().email('Invalid email address').trim().toLowerCase().max(255),
  })
});
module.exports={updateWorkspaceInviteSchema,addWorkspaceMemberSchema};