const prisma = require('../config/prisma');

async function getWorkspaceMembers(workspaceId) {
  return prisma.users.findMany({
    where: {
      workspaceMembers: {
        some: {
          workspaceId,
        },
      },
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      description: true,
    },
  });
}

async function isMemberOfWorkspace(workspaceId, userId) {
  return prisma.workspacemembers.findFirst({
    where: {
      workspaceId,
      userId,
    },
  });
}

async function deleteMemberAndInvites(workspaceId, memberId, userId) {
  return prisma.$transaction([
    prisma.workspacemembers.deleteMany({
      where: {
        workspaceId,
        userId: memberId,
      },
    }),
    prisma.workspaceinvites.deleteMany({
      where: {
        workspaceId,
        invitedBy: userId,
        invitedUser: memberId,
      },
    }),
  ]);
}

async function deleteMemberAndInvitesOnExit(workspaceId, userId) {
  return prisma.$transaction([
    prisma.workspacemembers.deleteMany({
      where: {
        workspaceId,
        userId,
      },
    }),
    prisma.workspaceinvites.deleteMany({
      where: {
        workspaceId,
        invitedUser: userId,
      },
    }),
  ]);
}

async function updateMemberRoleAndTransferOwnership(workspaceId, memberId, userId, newRole) {
 return prisma.$transaction([
  prisma.workspacemembers.update({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId: memberId,
      },
    },
    data: {
      role: newRole,
    },
  }),

  prisma.workspacemembers.update({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
    data: {
      role: 'member',
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
]);
}

module.exports = {
  getWorkspaceMembers,
  isMemberOfWorkspace,
  deleteMemberAndInvites,
  deleteMemberAndInvitesOnExit,
  updateMemberRoleAndTransferOwnership,
};