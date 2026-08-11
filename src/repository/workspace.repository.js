const prisma = require("../config/prisma");
async function createWorkspace(data) {
  const workspace = await prisma.$transaction([
    prisma.workspaces.create({
      data: {
        name: data.name,
        description: data.description || null,
        ownerId: data.ownerId,
      },
    }),
    await prisma.workspacemembers.create({
      data: {
        workspaceId: workspace.id,
        userId: data.ownerId,
        role: 'owner',
      },
    }),
  ]);
  return workspace;
}async function getAllWorkspaces(userId) {
  return prisma.workspaces.findMany({
    where: {
      deletedAt: null,
      OR: [
        { ownerId: userId },                
        {
          members: {
            some: {userId: userId,},
          },
        },],
    },
  });
}
async function getWorkspaceById(id, userId) {
  return prisma.workspaces.findFirst({
    where: {
      id,
      deletedAt: null,
      OR: [
        { ownerId: userId },                
        {
          members: {
            some: {userId: userId,},
          },
        },],
    },
    },
  )};
async function WorkspaceById(id, userId) {
  return prisma.workspaces.findFirst({
    where: {
      id,
      deletedAt: null,
      ownerId: userId },
  });
}
async function updateWorkspace(id, data) {
  return prisma.workspaces.update({
    where: { id},
    data,
  });
}
async function deleteWorkspace(id) {
   prisma.workspaces.update({
    where: { id: workspaceId },
    data: { deletedAt: new Date() },
  }),

  prisma.projects.updateMany({
    where: { workspaceId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
}

module.exports = { createWorkspace, getAllWorkspaces,WorkspaceById, getWorkspaceById, updateWorkspace, deleteWorkspace, };