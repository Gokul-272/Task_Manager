const {z}=require('zod');
const updateWorkspaceMemberRoleSchema=z.object({
    params:z.object({
        workspaceId:z.string().uuid(),
        memberId:z.string().uuid()
    }),
    body:z.object({
        role:z.enum(['owner','member'])
    })
});
module.exports={updateWorkspaceMemberRoleSchema};
