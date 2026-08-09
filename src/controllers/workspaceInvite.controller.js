const workspaceInviteservice = require('../service/workspaceinvite.service');
const sendWorkspaceInvite = async (req,res,next) => {
  try {
    const { workspaceId } = req.params;
    const { email } = req.body;
    const result = await workspaceInviteservice.sendWorkspaceInvite(workspaceId, email, req.user.id);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
const deleteWorkspaceInvite = async (req,res,next) => {
  try {
    const { inviteId } = req.params;
    const result = await workspaceInviteservice.deleteWorkspaceInvite(inviteId, req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getWorkspaceInvitesBySender = async (req, res ,next) => {
  try {
    const result = await workspaceInviteservice.getWorkspaceInvitesBySender(req.user.id);  
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  sendWorkspaceInvite,
  deleteWorkspaceInvite,
  getWorkspaceInvitesBySender,
};