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
}
async function removemember(projectId, memberId) {
    return prisma.$transaction([
    prisma.tasks.updateMany({
      where: {
        assignedTo: memberId,
        board: {
          projectId,
        },
        deletedAt: null,
      },
      data: {
        assignedTo: null,
      },
    }),
    prisma.projectmembers.update({
        where: {
            projectId_userId: {
             projectId,
             userId: memberId,
            },
        },
        data: {
            deletedAt: new Date(),
        },
    })
    ]);
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
                projectId_userId: {
                    projectId,
                    userId: memberId, 
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
                 projectId_userId: {
                    projectId,
                    userId: userId,
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