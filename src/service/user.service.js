const userrepository = require('../repository/user.repository');
const workspaceRepository = require('../repository/workspace.repository');
const AppError = require('../utils/AppError');
async function getCurrentUser(userId) {
  return userrepository.getCurrentUser(userId);
}
async function updateUser(userId, data) {
    return userrepository.updateUser(userId, data);
}
async function deleteUser(userId) {
    const ownedWorkspaces = await workspaceRepository.ownerworkspaces(userId);
    if (ownedWorkspaces.length > 0) {
        throw new AppError('Cannot delete user. User is the owner of one or more workspaces. Kindly transfer ownership or delete the workspaces first.',400);
    }
    return userrepository.deleteUser(userId);
}
async function getUserDashboard(userId) {
    const dashboardData = await userrepository.getUserDashboard(userId);
    return dashboardData;
}
async function myownedWorkspaces(userId) {
    const ownedWorkspaces = await userrepository.ownerworkspaces(userId);
    return ownedWorkspaces;
}
async function getmyprojects(workspaceId, userId) {
    const workspace = await workspaceRepository.WorkspaceById(workspaceId, userId);
    if (!workspace) {
        throw new AppError('Workspace not found or you do not have access to this workspace', 404);
    }
    const projects = await userrepository.getmyprojects(workspaceId, userId);
    return projects;
}
module.exports = {
  getCurrentUser,
  updateUser,
  deleteUser,
  getUserDashboard,
  myownedWorkspaces,
}; 