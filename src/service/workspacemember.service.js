const workspaceMemberRepository=require('../repository/workspacemember.repository');

async function addWorkspaceMember(workspaceId,email,userId){
    return workspaceMemberRepository.addWorkspaceMember(workspaceId,email,userId);
}
module.exports={
    addWorkspaceMember
}