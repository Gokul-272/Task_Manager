const prisma = require('../config/prisma');
async function createInvite(workspaceId, invitedBy,invitedUser) {
  return prisma.workspaceinvites.create({
    data: {
      workspaceId,
      invitedBy,
      invitedUser,
    },
  });
}
async function findInviteByIdAndInvitedUser(inviteId, userId) {
  return prisma.workspaceinvites.findFirst({
    where: {
      id: inviteId,
      invitedUser: userId,
    },
  });
}
async function findInviteByWorkspaceAndUser(workspaceId, userId) {
  return prisma.workspaceinvites.findFirst({
    where: {
      workspaceId,
      invitedUser: userId,
    },
  });
}
async function findPendingInviteByIdAndInvitedUser(inviteId, userId) {
  return prisma.workspaceinvites.findFirst({
    where: {
      id: inviteId,
      invitedUser: userId,
      status: 'PENDING',
    },
  });
}
async function updateInvite(inviteId, data) {
  return prisma.workspaceinvites.update({
    where: { id: inviteId },
    data,
  });
}
async function getWorkspaceInvites(userId) {
  return prisma.workspaceinvites.findMany({
    where: {
      invitedUser: userId,
    },
  });
}
async function getWorkspaceInvitesBySender(senderId) {
  return prisma.workspaceinvites.findMany({
    where: {
      invitedBy: senderId,
    },
  });
}
async function deleteInvite(inviteId) {
  return prisma.workspaceinvites.delete({
    where: { id: inviteId },
  });
}
async function updateInviteStatusAndAddMember(inviteId, status, workspaceId, userId) {
  return prisma.$transaction(async (tx) => {
    await tx.workspaceinvites.update({
      where: { id: inviteId },
      data: { status },
    });
    if (status === 'ACCEPTED') {
      await tx.workspacemembers.create({
        data: {
          workspaceId,
          userId,
          role: 'member',
        },
      });
    }
  });
}

module.exports = {
  findInviteByIdAndInvitedUser,
  findInviteByWorkspaceAndUser,
  findPendingInviteByIdAndInvitedUser,
  createInvite,
  updateInvite,
  getWorkspaceInvites,
  getWorkspaceInvitesBySender,
  deleteInvite,
  updateInviteStatusAndAddMember,
};
