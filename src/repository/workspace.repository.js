const prisma = require("../config/prisma");

async function createWorkspace(data) {
   const workspace = await prisma.workspaces.create({
    data,
  });
  await prisma.workspacemembers.create({
    data: {
      workspaceId: workspace.id,
      userId: data.ownerId,
       role: "owner",
    },
  });
  return workspace;
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
  const workspace = await prisma.workspaces.findFirst({
  where: {
    id,
    ownerId: userId,
    deletedAt: null,
  },
});

if (!workspace) {
  throw new Error('Workspace not found');
}

return prisma.workspaces.update({
  where: { id },
  data,
});
}
async function deleteWorkspace(id, userId) {
const workspace = await prisma.workspaces.findFirst({
  where: {
    id,
    ownerId: userId,
    deletedAt: null,
  },
});
if (!workspace) {
  throw new Error('Workspace not found');
}
return prisma.workspaces.update({
  where: { id },
  data: {deletedAt: new Date()},
});
       
}

module.exports = {createWorkspace,getAllWorkspaces,getWorkspaceById,updateWorkspace,deleteWorkspace,};