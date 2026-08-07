const workspaceinviterepository = require('../repository/workspaceinvite.repository');
async function sendWorkspaceInvite(workspaceId, email, senderId) {
  return workspaceinviterepository.sendworkspaceinvite(workspaceId, email, senderId);
}
async function updateWorkspaceInvitationStatus(inviteId, status, userId) {
  return workspaceinviterepository.updateworkspaceinvitationstatus(inviteId, status, userId);
}
async function getWorkspaceInvites(userId) {
  return workspaceinviterepository.getworkspaceinvites(userId);
}

async function getWorkspaceInvitesBySender(senderId) {
  return workspaceinviterepository.getworkspaceinvitesbysender(senderId);
}
async function deleteWorkspaceInvite(inviteId, userId) {
  return workspaceinviterepository.deleteworkspaceinvite(inviteId, userId);
}
module.exports = {
  sendWorkspaceInvite,
  updateWorkspaceInvitationStatus,
  getWorkspaceInvites,
  getWorkspaceInvitesBySender,
  deleteWorkspaceInvite,
};