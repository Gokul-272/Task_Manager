const projectMemberRepository = require('../repository/projectmember.repository');
const projectRepository = require('../repository/project.repository');
const AppError = require('../utils/AppError');
const userRepository = require('../repository/user.repository');
async function addProjectMember(workspaceId, projectId, email, userId) {
 const project = await projectRepository.findById(workspaceId, projectId, userId);
    if (!project) {
        throw new AppError('Project not found or you do not have access to this project', 404);
    }
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const projectMember = await projectMemberRepository.addProjectMember(projectId, user.id,userId);
  return projectMember;
}
async function getProjectMembers(workspaceId, projectId, userId) {
  const project = await projectRepository.getProjectById(workspaceId, projectId, userId);
    if (!project) {
        throw new AppError('Project not found', 404);
    }
  const projectMembers = await projectMemberRepository.findMembersByProjectId(workspaceId, projectId, userId);
    if (!projectMembers || projectMembers.length === 0) {
        throw new AppError('No project members found for this project', 404);
    }
    return projectMembers;
}
async function getProjectMemberById(workspaceId, projectId, memberId, userId) {
    const project = await projectRepository.getProjectById(workspaceId, projectId, userId);
    if (!project) {
        throw new AppError('Project not found', 404);
    }
    const projectMember = await projectMemberRepository.findmemberById(projectId, memberId, userId);
    if (!projectMember) {
        throw new AppError('Project member not found', 404);
    }
    return projectMember;
}
async function updateProjectMemberRole(projectId, memberId, role, userId) {
  const member = await projectMemberRepository.findmemberById(projectId, memberId, userId);
  if (!member) {
    throw new AppError('Project member not found', 404);
  }
  const updatedMember = await projectMemberRepository.updateRole(projectId, memberId, role, userId);
  return updatedMember;
}
async function removeProjectMember(projectId, memberId, userId) {
  const member = await projectMemberRepository.findmemberById(projectId, memberId, userId);
  if (!member) {
    throw new AppError('Project member not found', 404);
    }
    const deletedMember = await projectMemberRepository.removemember(memberId);
    return deletedMember;
}
async function exitProject(projectId, userId) {
    const project = await projectRepository.projectById(projectId);
    if (!project) {
        throw new AppError('Project not found', 404);
    }
    const deletedMember = await projectMemberRepository.exitProject(projectId, userId);
    return deletedMember;
}
async function updateProjectMemberRole(projectId, memberId, role, userId) {
    const member = await projectMemberRepository.findmemberById(projectId, memberId, userId);
    if (!member) {
        throw new AppError('Project member not found', 404);
    }
    const updatedMember = await projectMemberRepository.updateRole(projectId, memberId, role, userId);
    return updatedMember;
}
module.exports = {
  addProjectMember,
  getProjectMembers,
  getProjectMemberById,
  updateProjectMemberRole,
  removeProjectMember,
  exitProject
};
