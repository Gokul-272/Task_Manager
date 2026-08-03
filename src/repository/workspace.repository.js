const prisma = require("../config/prisma");

async function createWorkspace(data) {
  return prisma.workspaces.create({
    data,
  });
}
async function getAllWorkspaces(userId) {
  return prisma.workspaces.findMany({
    where: {
      ownerId: userId,
      deletedAt: null,
    },
  });
}
async function getWorkspaceById(id, userId) {
    return prisma.workspaces.findFirst({
        where: {
            id,
            ownerId: userId,
            deletedAt: null,
        },
    });
}

async function updateWorkspace(id, data, userId) {
    return prisma.workspaces.updateMany({
        where: {
            id,
            ownerId: userId,
            deletedAt: null,
        },
        data,
    });
}
async function deleteWorkspace(id, userId) {
    return prisma.workspaces.updateMany({
        where: {
            id,
            ownerId: userId,
            deletedAt: null,
        },
        data: {
            deletedAt: new Date(),
        },
    });
}

module.exports = {createWorkspace,getAllWorkspaces,getWorkspaceById,updateWorkspace,deleteWorkspace,};