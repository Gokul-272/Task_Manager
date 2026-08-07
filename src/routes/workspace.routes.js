const workspacerouter = require('express').Router();
const workspaceController = require('../controllers/workspace.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createWorkspaceSchema,updateWorkspaceSchema,workspaceIdSchema } = require('../validators/workspace.validator');

console.log('authMiddleware:', typeof authMiddleware);

workspacerouter.post('/',authMiddleware,validate(createWorkspaceSchema), workspaceController.createWorkspace);
workspacerouter.get('/', authMiddleware, workspaceController.getAllWorkspaces);
workspacerouter.get('/:id',authMiddleware,validate(workspaceIdSchema), workspaceController.getWorkspaceById);
workspacerouter.patch('/:id',authMiddleware,validate(workspaceIdSchema),validate(updateWorkspaceSchema), workspaceController.updateWorkspace);
workspacerouter.delete('/:id',authMiddleware,validate(workspaceIdSchema),workspaceController.deleteWorkspace);
module.exports = workspacerouter;