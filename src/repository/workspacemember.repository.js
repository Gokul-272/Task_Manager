const prisma = require('../config/prisma');

async function getWorkspaceMembers(workspaceId) {
  return prisma.users.findMany({
    where: {
      deletedAt: null,
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
     prisma.tasks.updateMany({
      where: {
        assignedTo: memberId,
        board: {
          project: {
            workspaceId,
          },
        },
        deletedAt: null,
      },
      data: {
        assignedTo: null,
      },
    }),
      prisma.projectmembers.updateMany({
      where: {
        project: {
          workspaceId,
        },
        userId: memberId,
      },
      data: {
        deletedAt: new Date(),
      },
    }),
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
     prisma.projectmembers.updateMany({
      where: {
        project: {
          workspaceId,
        },
        userId,
      },
      data: {
        deletedAt: new Date(),
      },
    }),
     prisma.tasks.updateMany({
      where: {
        assignedTo: userId,
        board: {
          project: {
            workspaceId,
          },
        },
        deletedAt: null,
      },
      data: {
        assignedTo: null,
      },
    }),
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
    // 1. Transfer board ownership
    prisma.boards.updateMany({
      where: {
        project: {
          workspaceId,
          createdBy: userId,
          deletedAt: null,
        },
        deletedAt: null,
      },
      data: {
        createdBy: memberId,
      },
    }),
    // 2. Transfer project ownership
    prisma.projects.updateMany({
      where: {
        workspaceId,
        createdBy: userId,
        deletedAt: null,
      },
      data: {
        createdBy: memberId,
      },
    }),
    // 3. New owner becomes project owner
    prisma.projectmembers.updateMany({
      where: {
        project: {
          workspaceId,
          createdBy: memberId,
          deletedAt: null,
        },
        userId: memberId,
        deletedAt: null,
      },
      data: {
        role: newRole,
      },
    }),

    // 4. Old owner becomes project member
    prisma.projectmembers.updateMany({
      where: {
        project: {
          workspaceId,
          createdBy: memberId,
          deletedAt: null,
        },
        userId: userId,
        deletedAt: null,
      },
      data: {
        role: 'member',
      },
    }),

    // 5. New workspace owner
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

    // 6. Previous workspace owner becomes member
    prisma.workspacemembers.update({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: userId,
        },
      },
      data: {
        role: 'member',
      },
    }),
    // 7. Transfer workspace ownership
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