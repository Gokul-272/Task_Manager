const router=require('express').Router();
const workspaceMemberController=require('../controllers/workspacemember.controller');
const {authMiddleware}=require('../middleware/auth.middleware');
const validate=require('../middleware/validate.middleware');
const {addWorkspaceMemberSchema,updateWorkspaceMemberSchema}=require('../validators/workspacemember.validator');
router.post('/:workspaceId/members',authMiddleware,validate(addWorkspaceMemberSchema),workspaceMemberController.addWorkspaceMember);
module.exports=router;