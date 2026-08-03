const router = require('express').Router();
const workspaceController = require('../controllers/workspace.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createWorkspaceSchema,updateWorkspaceSchema,workspaceIdSchema } = require('../validators/workspace.validator');

console.log('authMiddleware:', typeof authMiddleware);

router.post('/',authMiddleware,validate(createWorkspaceSchema), workspaceController.createWorkspace);
router.get('/', authMiddleware, workspaceController.getAllWorkspaces);
router.get('/:id',authMiddleware,validate(workspaceIdSchema), workspaceController.getWorkspaceById);
router.patch('/:id',authMiddleware,validate(workspaceIdSchema),validate(updateWorkspaceSchema), workspaceController.updateWorkspace);
router.delete('/:id',authMiddleware,validate(workspaceIdSchema),workspaceController.deleteWorkspace);
module.exports = router;