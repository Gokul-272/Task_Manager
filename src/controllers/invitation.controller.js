const workspaceInviteservice = require('../service/workspaceinvite.service');
const updateWorkspaceInvitationStatus = async (req, res,next) => {
  try {
    const { inviteId } = req.params;
    const { status } = req.body;
    const result = await workspaceInviteservice.updateWorkspaceInvitationStatus(inviteId, status, req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
const getWorkspaceInvites = async (req, res,next) => {
  try {
    const result = await workspaceInviteservice.getWorkspaceInvites(req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateWorkspaceInvitationStatus,
  getWorkspaceInvites,
};