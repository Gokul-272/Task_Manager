const prisma=require('../config/prisma');
async function sendworkspaceinvite(workspaceId,email,senderId){
    const workspace=await prisma.workspaces.findFirst({
        where:{
            id:workspaceId,
            ownerId:senderId,
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
   
    const existingInvite = await prisma.workspaceinvites.findFirst({
     where: {
          workspaceId,
          invitedUser: user.id
       }
    });

if (existingInvite) {
  if (existingInvite.status === 'PENDING') {
    throw new Error('Invitation already pending');
  }
  if (existingInvite.status === 'ACCEPTED') {
    throw new Error('User already accepted the invitation');
  }
  if (existingInvite.status === 'REJECTED') {
    await prisma.workspaceinvites.update({
      where: { id: existingInvite.id },
      data: {
        status: 'PENDING',
        invitedBy: senderId
      }
    });
    return { message: 'Workspace invite re-sent successfully' };
  }
  }else {
await prisma.workspaceinvites.create({
  data: {
    workspaceId,
    invitedBy: senderId,
    invitedUser: user.id
  }
});
return { message: 'Workspace invite sent successfully' };
  }
};

async function updateworkspaceinvitationstatus(inviteId,status,userId){
    const invite=await prisma.workspaceinvites.findFirst({
        where:{
             id: inviteId,
             invitedUser: userId
        }
    });
    if(!invite){
        throw new Error('Invite not found or access denied');
    }
    await prisma.workspaceinvites.update({
        where:{
            id:inviteId
        },
        data:{
            status
        }
    });
    if (status === 'ACCEPTED') {
    await prisma.workspacemembers.create({
      data: {
        workspaceId: invite.workspaceId,
        userId: userId,
        role: 'member'
      }
    });
  }
    return {message:'Workspace invite status updated successfully'};
};

async function getworkspaceinvites(userId){
    const invites=await prisma.workspaceinvites.findMany({
        where:{
         invitedUser: userId
        }
    });
    return invites;
} 
async function getworkspaceinvitesbysender(senderId){
    const invites=await prisma.workspaceinvites.findMany({
        where:{
            invitedBy:senderId,
        }
    });
    return invites;
}
async function deleteWorkspaceInvite(inviteId, userId) {
  const invite = await prisma.workspaceinvites.findFirst({
    where: {
      id: inviteId,
      invitedUser: userId,
      status: 'PENDING',
    },
  });

  if (!invite) {
    throw new Error('Invite not found or access denied');
  }
  await prisma.workspaceinvites.delete({
    where: { id: inviteId },
  });

  return { message: 'Workspace invite deleted successfully' };
}
module.exports={
    sendworkspaceinvite,
    updateworkspaceinvitationstatus,
    getworkspaceinvites,
    getworkspaceinvitesbysender,
    deleteWorkspaceInvite
}
