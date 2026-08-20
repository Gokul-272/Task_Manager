const prisma = require('../config/prisma');

async function addProjectMember(projectId, memberId, userId) {
    return prisma.projectmembers.create({
        data: {
            projectId,
            userId: memberId,
            addedBy: userId,
        },
    });
}
async function findMembersByProjectId(workspaceId, projectId) {
    const projectMembers = await prisma.projectmembers.findMany({
        where: {
            projectId,
            deletedAt: null,
            project: {
                workspaceId,
            },
        },
        include: {
            user: true,
        },
    });
    return projectMembers;
}
async function findmemberById(projectId, memberId) {
    return prisma.projectmembers.findFirst({
        where: {
            projectId,
            userId: memberId,
            deletedAt: null,
        },
    });
}
async function findmemberByIdAndUpdate(projectId, memberId, userId) {
    return prisma.projectmembers.findFirst({
        where: {
            projectId,
            userId: memberId,
            addedBy: userId,
            deletedAt: null,
        },
    });
}async function removemember(projectId, memberId) {
  return prisma.$transaction(async (tx) => {

    // Find all boards belonging to this project
    const boards = await tx.boards.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
      },
    });

    console.log("BOARDS:", boards);

    const boardIds = boards.map(board => board.id);

    // Unassign member's tasks
    const taskResult = await tx.tasks.updateMany({
      where: {
        assignedTo: memberId,
        boardId: {
          in: boardIds,
        },
      },
      data: {
        assignedTo: null,
      },
    });

    // Soft-delete project membership
    const memberResult = await tx.projectmembers.updateMany({
      where: {
        projectId,
        userId: memberId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      tasksUnassigned: taskResult.count,
      memberRemoved: memberResult.count,
    };
  });
}
async function updateRole(projectId, memberId, role, userId) {
    const updatedMember = await prisma.$transaction([
      prisma.tasks.updateMany({
        where: {
            createdBy: userId,
            board: {
                projectId,
            },
        },
        data: {
          createdBy: memberId,
        },
        }),
       prisma.boards.updateMany({
            where: {
                project: {
                    id: projectId,
                },
            },
            data: {
                createdBy: memberId,
            },
        }),
        prisma.projectmembers.update({
            where: {
                projectId_userId_deletedAt: {
                    projectId,
                    userId: memberId,
                    deletedAt: null,
                },
            },
            data: {
                role:role,
            },
        }),
        prisma.projects.update({
            where: {
                id: projectId,
            },
            data: {
                createdBy: memberId,
            },
        }),
        prisma.projectmembers.update({
            where: {
                 projectId_userId_deletedAt: {
                    projectId,
                    userId: userId,
                    deletedAt: null,
                },
            },
            data: {
                role: 'member',
            },
        }),
    ]);
    return updatedMember;
}

module.exports = {
    addProjectMember,
    findMembersByProjectId,
    findmemberById,
    removemember, 
    updateRole,
    findmemberByIdAndUpdate
};