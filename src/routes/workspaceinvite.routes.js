const workspaceInviteRouter = require('express').Router({ mergeParams: true });
const workspaceInviteController = require('../controllers/workspaceinvite.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const {addWorkspaceMemberSchema} = require('../validators/workspaceinvite.validator');
workspaceInviteRouter.post('/', authMiddleware, validate(addWorkspaceMemberSchema), workspaceInviteController.sendWorkspaceInvite);
workspaceInviteRouter.get('/sent', authMiddleware, workspaceInviteController.getWorkspaceInvitesBySender);
workspaceInviteRouter.delete('/:inviteId', authMiddleware, workspaceInviteController.deleteWorkspaceInvite);
module.exports = workspaceInviteRouter;