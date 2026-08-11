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
    return prisma.projectmembers.update({
        where: {
            projectId_userId: {
             projectId,
             userId: memberId,
            },
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
    exitProject,
    updateRole,
    findmemberByIdAndUpdate
};