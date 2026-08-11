const ProjectRepository = require('../repository/project.repository');
const WorkspaceRepository = require('../repository/workspace.repository');
const AppError = require('../utils/AppError');
async function createProject(workspaceId, data, userId) {
  const workspace = await WorkspaceRepository.WorkspaceById(workspaceId, userId);
  if (!workspace) {
    throw new AppError('Workspace not found',404);
  }
  return ProjectRepository.createProject(workspaceId, data, userId);
}
async function getAllProjects(workspaceId,userId, { skip, limit, search }) {
  const workspace = await WorkspaceRepository.getWorkspaceById(workspaceId, userId);
    if (!workspace) {
        throw new AppError('Workspace not found', 404);
    }
    return ProjectRepository.getAllProjects(workspaceId,userId, skip, limit, search );
}
async function getProjectById(workspaceId, projectId, userId) {
  const workspace = await WorkspaceRepository.getWorkspaceById(workspaceId, userId);
    if (!workspace) {
        throw new AppError('Workspace not found', 404);
    }
  const project = await ProjectRepository.getProjectById(workspaceId, projectId);
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  return project;
}
async function updateProject(workspaceId, projectId, data, userId) {
    const project = await ProjectRepository.findbyId(workspaceId, projectId,userId);
    if (!project) {
        throw new AppError('You are not the owner of this project to update', 403);
    }
    return ProjectRepository.updateProject(projectId, data);
}
async function deleteProject(workspaceId, projectId, userId) {
    const project = await ProjectRepository.findbyId(workspaceId, projectId,userId);
    if (!project) {
        throw new AppError('You are not the owner of this project to delete', 403);
    }
    const result = await ProjectRepository.deleteProject(projectId);
    if (result.count === 0) {
        throw new AppError('Project not found or already deleted', 404);
    }
    return result;
}
module.exports = {
  createProject,
  getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
}