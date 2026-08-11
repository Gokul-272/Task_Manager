const projectMemeberService = require('../service/projectmembers.service');
const addProjectMember = async (req, res, next) => {
  try {
    const { workspaceId, projectId } = req.params;
    const { email } = req.body;
    const result = await projectMemeberService.addProjectMember(workspaceId, projectId, email, req.user.id);
    res.status(201).json({
      success: true,
      message: 'Project member added successfully',
      data: result
    });
  }catch (error) {
    next(error);
  }
};
const getProjectMembers = async (req, res, next) => {
  try {
    const { workspaceId, projectId } = req.params;
    const result = await projectMemeberService.getProjectMembers(workspaceId, projectId);
    res.status(200).json({
      success: true,
        message: 'Project members retrieved successfully',
        data: result
    });
  }
    catch (error) {
    next(error);
  }
};
const getProjectMemberById = async (req, res, next) => {
  try {
    const { workspaceId, projectId, memberId } = req.params;
    const result = await projectMemeberService.getProjectMemberById(workspaceId, projectId, memberId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Project member not found'
      });
    }
    res.status(200).json({
      success: true,
        message: 'Project member retrieved successfully',
        data: result
    });
  }
  catch (error) {
    next(error);
  }
}
const updateProjectMemberRole = async (req, res, next) => {
  try {
    const { projectId, memberId } = req.params;
    const { role } = req.body;
    const result = await projectMemeberService.updateProjectMemberRole(projectId, memberId, role, req.user.id);
    res.status(200).json({
        success: true,
        message: 'Project member role updated successfully',
        data: result
    });
  }
    catch (error) {
    next(error);
  }
};
const removeProjectMember = async (req, res, next) => {
  try {
    const {projectId, memberId } = req.params;
    const result = await projectMemeberService.removeProjectMember(projectId, memberId, req.user.id);
    res.status(200).json({
        success: true,
        message: 'Project member removed successfully',
        data: result
    });
  }
  catch (error) {
    next(error);
  }
};
const exitProject = async (req, res, next) => {
  try {
    const { projectId} = req.body;
    const result = await projectMemeberService.exitProject( projectId, req.user.id);
    res.status(200).json({
        success: true,
        message: 'Exited project successfully',
        data: result
    });
  }
  catch (error) {
    next(error);
  }
};
module.exports = {
  addProjectMember,
  getProjectMembers,
  getProjectMemberById,
  updateProjectMemberRole,
  removeProjectMember,
  exitProject
};  