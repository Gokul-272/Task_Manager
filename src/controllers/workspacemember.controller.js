const workspaceMemberService=require('../service/workspacemember.service');
const getWorkspaceMembers = async (req, res,next) => {
    try{
        const { workspaceId } = req.params;
        const userId = req.user.id;
        const result = await workspaceMemberService.getWorkspaceMembers(workspaceId, userId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}
const removeWorkspaceMember = async (req, res,next) => {
    try{    
        const { workspaceId, memberId } = req.params;
        const userId = req.user.id;
        const result = await workspaceMemberService.removeWorkspaceMember(workspaceId, memberId, userId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}
const exitWorkspace = async (req, res,next) => {
    try {
        const { workspaceId } = req.params;
        const userId = req.user.id;
        const result = await workspaceMemberService.exitWorkspace(workspaceId, userId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}
async function updateWorkspaceMemberRole(req, res,next) {
    try{
        const {workspaceId}= req.params;
        const { memberId, newRole } = req.body;
        const userId = req.user.id;
        const result = await workspaceMemberService.updateWorkspaceMemberRole(workspaceId, memberId, newRole, userId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error); 
    }
}
module.exports={
    getWorkspaceMembers,
    removeWorkspaceMember,
    exitWorkspace,
    updateWorkspaceMemberRole
};
