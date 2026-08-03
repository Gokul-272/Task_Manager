const prisma=require('../config/prisma');    

async function addWorkspaceMember(workspaceId,email,userId){
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
    const user=await prisma.users.findFirst({
        where:{
            email,
            deletedAt:null,
        }
    });
    if(!user){
        throw new Error('User not found');
    }
try {
  return await prisma.workspacemembers.create({
    data: {
      workspaceId,
      userId: user.id,
    },
  });
} catch (error) {
  if (error.code === "P2002") {
    throw new Error("User is already a workspace member");
  }
  throw error;
}
};
module.exports={
    addWorkspaceMember
}