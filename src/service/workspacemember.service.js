const workspaceMemberRepository = require('../repository/workspacemember.repository');
const workspaceRepo = require('../repository/workspace.repository');
const AppError = require('../utils/AppError');

async function getWorkspaceMembers(workspaceId, userId) {
  const workspace = await workspaceRepo.getWorkspaceById(workspaceId, userId);
  if (!workspace) {
    throw new AppError('Workspace not found or access denied', 404);
  }
  return workspaceMemberRepository.getWorkspaceMembers(workspaceId);
}

async function removeWorkspaceMember(workspaceId, memberId, userId) {
  const workspace = await workspaceRepo.WorkspaceById(workspaceId, userId);
  if (!workspace) {
    throw new AppError('Access denied', 403);
  }
  const member = await workspaceMemberRepository.isMemberOfWorkspace(workspaceId, memberId);
  if (!member) {
    throw new AppError('Member not found', 404);
  }
  if (memberId === workspace.ownerId) {
    throw new AppError('Workspace owner cannot be removed', 400);
  }

  await workspaceMemberRepository.deleteMemberAndInvites(workspaceId, memberId, userId);
  return { message: 'Workspace member removed successfully' };
}

async function exitWorkspace(workspaceId, userId) {
   console.log("5. EXIT SERVICE HIT");
  const workspace = await workspaceRepo.getWorkspaceById(workspaceId, userId);
   console.log("6. WORKSPACE:", workspace);
  if (!workspace) {
    throw new AppError('Workspace not found', 404);
  }
  if (userId === workspace.ownerId) {
    throw new AppError('Workspace owner cannot exit the workspace', 400);
  }
  console.log("8. OWNER ID:", workspace.ownerId);
  console.log("9. USER ID:", userId);
  console.log("11. STARTING TRANSACTION");
  await workspaceMemberRepository.deleteMemberAndInvitesOnExit(workspaceId, userId);
  console.log("12. TRANSACTION SUCCESS");
  return { message: 'Exited from workspace successfully' };
}

async function updateWorkspaceMemberRole(workspaceId, memberId, newRole, userId) {
  const workspace = await workspaceRepo.getWorkspaceById(workspaceId, userId);
  if (!workspace) {
    throw new AppError('Workspace not found or access denied', 404);
  }

  const member = await workspaceMemberRepository.isMemberOfWorkspace(workspaceId, memberId);
  if (!member) {
    throw new AppError('Member not found or access denied', 404);
  }

  await workspaceMemberRepository.updateMemberRoleAndTransferOwnership(workspaceId, memberId, userId, newRole);
}

module.exports = {
  getWorkspaceMembers,
  removeWorkspaceMember,
  exitWorkspace,
  updateWorkspaceMemberRole,
};