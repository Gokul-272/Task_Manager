const workspaceMemberService=require('../service/workspacemember.service');
const addWorkspaceMember=async(req,res)=>{
    try{
        const {workspaceId}=req.params;
        const {email}=req.body;
        const result=await workspaceMemberService.addWorkspaceMember(workspaceId,email,req.user.id);
        res.status(201).json( { success: true, data: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports={
    addWorkspaceMember
};