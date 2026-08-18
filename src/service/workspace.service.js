const workspaceRepo = require('../repository/workspace.repository');
const AppError = require('../utils/AppError');
async function createWorkspace(data, userId) {
  const workspaceData = {
    ...data,
    ownerId: userId,
  };
  return workspaceRepo.createWorkspace(workspaceData);
}
async function getAllWorkspaces(userId) {
  return workspaceRepo.getAllWorkspaces(userId);
}
async function getWorkspaceById(id, userId) {
  const workspaces = await workspaceRepo.getWorkspaceById(id, userId);
  if (!workspaces) {
    throw new AppError('Workspace not found', 404);
  }
  return workspaces;
}
async function updateWorkspace(id, data, userId) {
  const workspaces = await workspaceRepo.getWorkspaceById(id, userId);
  if (!workspaces) {
    throw new AppError('Workspace not found', 404);
  }
  if (workspaces.ownerId !== userId) {
    throw new AppError('You do not have access to update this workspace', 403);
  }
  return workspaceRepo.updateWorkspace(id, data);
}
async function deleteWorkspace(id, userId) {
  const workspaces = await workspaceRepo.getWorkspaceById(id, userId);
  if (!workspaces) {
    throw new AppError('Workspace not found', 404);
  }
  if (workspaces.ownerId !== userId) {
    throw new AppError('You do not have access to delete this workspace', 403);
  }
  return workspaceRepo.deleteWorkspace(id);
}
module.exports = {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace
}