const prisma=require('../config/prisma');    
async function getWorkspaceMembers(workspaceId,userId)
{
    const workspace=await prisma.workspaces.findFirst({
        where:{
            id:workspaceId,
            ownerId:userId,
            deletedAt:null,
        }
    });
    if(!workspace){
        throw new Error('Workspace not found or access denied');
    }
    const members=await prisma.users.findMany({
        where:{
            workspaceMembers:{
                some:{
                    workspaceId,
                }
            }
        },
        select:{
            id:true,
            fullName:true,
            email:true,
            description:true,
        }
    });
    return members;
}

async function removeWorkspaceMember(workspaceId,memberId,userId)
{
    const workspace=await prisma.workspaces.findFirst({
        where:{
            id:workspaceId,
            ownerId:userId,
            deletedAt:null,
        }
    });
    if(!workspace){
        throw new Error('Workspace not found or access denied');
    }
    const member=await prisma.users.findFirst({
        where:{
            id:memberId,
            workspaceMembers:{
                some:{
                    workspaceId,
                }
            }           
        }
    }); 
    if(!member){
        throw new Error('Member not found or access denied');
    }
    if (memberId === workspace.ownerId) {
     throw new Error("Workspace owner cannot be removed");
    } 
     await prisma.$transaction([
        prisma.workspacemembers.deleteMany({
            where:{
                workspaceId,
                userId:memberId,
            }
        }),
         prisma.workspaceinvites.deleteMany({
        where:{
            workspaceId,
            invitedBy:userId,
            invitedUser:memberId,
        }
    })
    ]);
    return {message:'Workspace member removed successfully'};
}
async function exitWorkspace(workspaceId,userId)
{
     const workspace=await prisma.workspaces.findFirst({
        where:{
            id:workspaceId,
            deletedAt:null,
        }
    });
    if(!workspace){
        throw new Error('Workspace not found or access denied');
    }
    if (userId === workspace.ownerId) {
     throw new Error("Workspace owner cannot exit the workspace");
    }
    await prisma.$transaction([
        prisma.workspacemembers.deleteMany({
            where:{
                workspaceId,
                userId,
            }
        }),
         prisma.workspaceinvites.deleteMany({
        where:{
            workspaceId,
            invitedUser:userId,
        }
    })
    ]);
    return {message:'Exited from workspace successfully'};
}
async function updateWorkspaceMemberRole(workspaceId, memberId, newRole, userId) {
    const workspace = await prisma.workspaces.findFirst({
        where: {
            id: workspaceId,
            ownerId: userId,
            deletedAt: null,
        },
    });
    if (!workspace) {
        throw new Error('Workspace not found or access denied');
    }
    const member = await prisma.users.findFirst({
        where: {
            id: memberId,
            workspacemembers: {
                some: {
                    workspaceId,
                },  
            },
        },
    });
    if (!member) {
        throw new Error('Member not found or access denied');
    }
    await prisma.$transaction([
         prisma.workspacemembers.updateMany({
            where: {
                workspaceId,
                userId: memberId,
            },
            data: {
                role: newRole,
            },
        }),
        prisma.workspacemembers.updateMany({
            where: {
                workspaceId,
                userId: userId,
            },
            data: {
                role:"member",
            },
        }),
        prisma.workspaces.update({
            where: {    
                id: workspaceId,
            },
            data: {
                ownerId: memberId,
            },
        }),
    ])
}
module.exports={
    getWorkspaceMembers,
    removeWorkspaceMember,
    exitWorkspace,
    updateWorkspaceMemberRole
};