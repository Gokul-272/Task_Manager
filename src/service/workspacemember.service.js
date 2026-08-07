const workspaceMemberRepository=require('../repository/workspacemember.repository');
async function getWorkspaceMembers(workspaceId,userId)
{
    return workspaceMemberRepository.getWorkspaceMembers(workspaceId,userId);
}
async function removeWorkspaceMember(workspaceId,memberId,userId)
{
    return workspaceMemberRepository.removeWorkspaceMember(workspaceId,memberId,userId);
}
async function exitWorkspace(workspaceId,userId)
{
    return workspaceMemberRepository.exitWorkspace(workspaceId,userId);
}
async function updateWorkspaceMemberRole(workspaceId, memberId, newRole, userId) {
    return workspaceMemberRepository.updateWorkspaceMemberRole(workspaceId, memberId, newRole, userId);
}
module.exports={
    getWorkspaceMembers,
    removeWorkspaceMember,
    exitWorkspace,
    updateWorkspaceMemberRole
};  