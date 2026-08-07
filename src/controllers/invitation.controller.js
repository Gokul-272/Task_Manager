const workspaceInviteservice = require('../service/workspaceinvite.service');
const updateWorkspaceInvitationStatus = async (req, res) => {
  try {
    const { inviteId } = req.params;
    const { status } = req.body;
    const result = await workspaceInviteservice.updateWorkspaceInvitationStatus(inviteId, status, req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getWorkspaceInvites = async (req, res) => {
  try {
    const result = await workspaceInviteservice.getWorkspaceInvites(req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  updateWorkspaceInvitationStatus,
  getWorkspaceInvites,
};