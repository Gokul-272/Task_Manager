const InviteRouter = require('express').Router();
const InviteController = require('../controllers/invitation.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const {updateWorkspaceInviteSchema } = require('../validators/workspaceinvite.validator');
InviteRouter.patch('/:inviteId',authMiddleware,validate(updateWorkspaceInviteSchema), InviteController.updateWorkspaceInvitationStatus);
InviteRouter.get('/invites', authMiddleware, InviteController.getWorkspaceInvites);
module.exports = InviteRouter;