const workspace= require('../repository/workspace.repository');
async function createWorkspace(data, userId) {
  const workspaceData = {
    ...data,
    ownerId: userId,
  };
  return workspace.createWorkspace(workspaceData);
}

async function getAllWorkspaces(userId)
{
    return workspace.getAllWorkspaces(userId);
}

async function getWorkspaceById(id, userId) {
    const workspaces = await workspace.getWorkspaceById(id, userId);
    if (!workspaces) {
    throw new Error('Workspace not found or access denied');
    }
    return workspaces;
}

async function updateWorkspace(id, data, userId) {
    const workspaces = await workspace.getWorkspaceById(id, userId);
    if (!workspaces) {
        throw new Error('Workspace not found or access denied');
    }
    return workspace.updateWorkspace(id, data, userId);
}
async function deleteWorkspace(id, userId) {
    const workspaces = await workspace.getWorkspaceById(id, userId);
    if (!workspaces) {
        throw new Error('Workspace not found or access denied');
    }
    return workspace.deleteWorkspace(id, userId);
}
module.exports = {
  createWorkspace,
  getAllWorkspaces,
    getWorkspaceById,
    updateWorkspace,
    deleteWorkspace
}