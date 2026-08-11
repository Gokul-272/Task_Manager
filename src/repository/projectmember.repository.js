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
async function findMembersByProjectId(workspaceId, projectId, userId) {
    const projectMembers = await prisma.projectmembers.findMany({
        where: {
            projectId,
            addedBy: userId,
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
async function findmemberById(projectId, memberId, userId) {
    return prisma.projectmembers.findFirst({
        where: {
            projectId,
            userId: memberId,
            addedBy: userId,
            deletedAt: null,
        },
    });
}
async function removemember(memberId) {
    return prisma.projectmembers.update({
        where: {
            userId: memberId,
            deletedAt: null,
        },
        data: {
            deletedAt: new Date(),
        },
    });
}
async function exitProject(projectId, userId) {
    return prisma.projectmembers.update({
        where: {
                projectId_userId: {
                    projectId,
                    userId,
                    deletedAt: null,
                },
        },
        data: {
            deletedAt: new Date(), 
        },
    });
}
async function updateRole(projectId, memberId, role, userId) {
    const updatedMember = await prisma.$transaction([
        prisma.projectmembers.update({
            where: {
                projectId_userId: {
                    projectId,
                    userId: memberId,
                    deletedAt: null,
                },
            },
            data: {
                role,
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
    exitProject,
    updateRole,
};