const workspaceInviteservice = require('../service/workspaceinvite.service');
const sendWorkspaceInvite = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { email } = req.body;
    const result = await workspaceInviteservice.sendWorkspaceInvite(workspaceId, email, req.user.id);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteWorkspaceInvite = async (req, res) => {
  try {
    const { inviteId } = req.params;
    const result = await workspaceInviteservice.deleteWorkspaceInvite(inviteId, req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWorkspaceInvitesBySender = async (req, res) => {
  try {

    const result = await workspaceInviteservice.getWorkspaceInvitesBySender(req.user.id);  
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  sendWorkspaceInvite,
  deleteWorkspaceInvite,
  getWorkspaceInvitesBySender
};