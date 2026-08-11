const {z}=require('zod');
const addProjectMemberSchema=z.object({
    params:z.object({
        workspaceId:z.string().uuid(),
        projectId:z.string().uuid()
    }),
    body:z.object({
        email:z.string().email({message:'Invalid email address'})
    })
});
const updateProjectMemberRoleSchema=z.object({
    params:z.object({
        workspaceId:z.string().uuid(),
        projectId:z.string().uuid(),
        memberId:z.string().uuid()
    }),
    body:z.object({
        role:z.enum(['owner','member'])
    })
});
module.exports={addProjectMemberSchema,updateProjectMemberRoleSchema};