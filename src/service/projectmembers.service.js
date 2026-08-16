const projectMemberRepository = require('../repository/projectmember.repository');
const projectRepository = require('../repository/project.repository');
const AppError = require('../utils/AppError');
const userRepository = require('../repository/user.repository');
async function addProjectMember(workspaceId, projectId, email, userId) {
 const project = await projectRepository.findbyId(workspaceId, projectId, userId);
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
async function getProjectMembers(workspaceId, projectId) {
  const project = await projectRepository.getProjectById(workspaceId, projectId);
    if (!project) {
        throw new AppError('Project not found', 404);
    }
  const projectMembers = await projectMemberRepository.findMembersByProjectId(workspaceId, projectId);
    if (!projectMembers || projectMembers.length === 0) {
        throw new AppError('No project members found for this project', 404);
    }
    return projectMembers;
}
async function getProjectMemberById(workspaceId, projectId, memberId) {
    const project = await projectRepository.getProjectById(workspaceId, projectId);
    if (!project) {
        throw new AppError('Project not found', 404);
    }
    const projectMember = await projectMemberRepository.findmemberById(projectId, memberId);
    if (!projectMember) {
        throw new AppError('Project member not found', 404);
    }
    return projectMember;
}
async function updateProjectMemberRole(projectId, memberId, role, userId) {
  const member = await projectMemberRepository.findmemberByIdAndUpdate(projectId, memberId,userId);
  if (!member) {
    throw new AppError('Only the project owner can transfer ownership',404);
  }
  const updatedMember = await projectMemberRepository.updateRole(projectId, memberId, role, userId);
  return updatedMember;
}
async function removeProjectMember(projectId, memberId, userId) {
  const member = await projectMemberRepository.findmemberByIdAndUpdate(projectId, memberId, userId);
  if (!member) {
    throw new AppError('Cannot able to delete Project member coz Member not found', 404);
    }
    const deletedMember = await projectMemberRepository.removemember(projectId, memberId);
    return deletedMember;
}
async function exitProject(projectId, userId) {
    const project = await projectMemberRepository.findmemberById(projectId,userId);
    if (!project) {
        throw new AppError('You are not a member of this project', 404);
    }
    const Member = await projectMemberRepository.removemember(projectId, userId);
    return Member;
}
module.exports = {
  addProjectMember,
  getProjectMembers,
  getProjectMemberById,
  updateProjectMemberRole,
  removeProjectMember,
  exitProject
};
