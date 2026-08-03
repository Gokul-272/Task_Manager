const {z}=require('zod');
const addWorkspaceMemberSchema=z.object({
  params:z.object({
    workspaceId:z.string().uuid(),
  }),
  body:z.object({
    email:z.string().email('Invalid email address').trim().toLowerCase().max(255),
  })
});
module.exports={addWorkspaceMemberSchema};