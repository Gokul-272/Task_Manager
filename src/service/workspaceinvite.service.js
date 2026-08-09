const workspaceInviteRepo = require('../repository/workspaceinvite.repository');
const workspaceRepo = require('../repository/workspace.repository');
const userRepo = require('../repository/user.repository');
const AppError = require('../utils/AppError');

async function sendWorkspaceInvite(workspaceId, email, senderId) {
  const workspace = await workspaceRepo.getWorkspaceById(workspaceId, senderId);
  if (!workspace) {
    throw new AppError('Workspace not found',404);
  }
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const existingInvite = await workspaceInviteRepo.findInviteByWorkspaceAndUser(workspaceId, user.id);

  if (existingInvite) {
    if (existingInvite.status === 'PENDING') {
      throw new AppError('Invitation already pending', 409);
    }
    if (existingInvite.status === 'ACCEPTED') {
      throw new AppError('User already accepted the invitation', 409);
    }
    if (existingInvite.status === 'REJECTED') {
      await workspaceInviteRepo.updateInvite(existingInvite.id, {
        status: 'PENDING',
        invitedBy: senderId,
      });
      return { message: 'Workspace invite re-sent successfully' };
    }
  }
  await workspaceInviteRepo.createInvite(workspaceId, senderId, user.id);
  return { message: 'Workspace invite sent successfully' };
}

async function updateWorkspaceInvitationStatus(inviteId, status, userId) {
  const invite = await workspaceInviteRepo.findInviteByIdAndInvitedUser(inviteId, userId);
  if (!invite) {
    throw new AppError('Invite not found', 404);
  }
  await workspaceInviteRepo.updateInviteStatusAndAddMember(inviteId, status, invite.workspaceId, userId);
  return { message: 'Workspace invite status updated successfully' };
}

async function getWorkspaceInvites(userId) {
  return workspaceInviteRepo.getWorkspaceInvites(userId);
}
async function getWorkspaceInvitesBySender(senderId) {
  return workspaceInviteRepo.getWorkspaceInvitesBySender(senderId);
}
async function deleteWorkspaceInvite(inviteId, userId) {
  const invite = await workspaceInviteRepo.findPendingInviteByIdAndInvitedUser(inviteId, userId);
  if (!invite) {
    throw new AppError('Invite not found',404);
  }
  await workspaceInviteRepo.deleteInvite(inviteId);
  return { message: 'Workspace invite deleted successfully' };
}

module.exports = {
  sendWorkspaceInvite,
  updateWorkspaceInvitationStatus,
  getWorkspaceInvites,
  getWorkspaceInvitesBySender,
  deleteWorkspaceInvite,
};