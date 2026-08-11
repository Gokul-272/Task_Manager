const projectService = require('../service/project.service');
const createProject = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const result = await projectService.createProject(workspaceId, req.body, req.user.id);
    res.status(201).json({
      success: true,
        message: 'Project created successfully',
        data: result
    });
  }
    catch (error) {
    next(error);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;
    const result = await projectService.getAllProjects(workspaceId, req.user.id, { skip, limit, search });
    res.status(200).json({
      success: true,
        message: 'Projects retrieved successfully',
        ...result
    });
  }
    catch (error) {
    next(error);
  }
};
const getProjectById = async (req, res, next) => {
  try {
    const { workspaceId, projectId } = req.params;
    const result = await projectService.getProjectById(workspaceId, projectId, req.user.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
        });
    }
    res.status(200).json({
      success: true,
        message: 'Project retrieved successfully',
        data: result
    });
  } 
    catch (error) {
    next(error);
  } 
};
const updateProject = async (req, res, next) => {
  try {
    const { workspaceId, projectId } = req.params;
    const result = await projectService.updateProject(workspaceId, projectId, req.body, req.user.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }   
    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }     
};
const deleteProject = async (req, res, next) => {
  try {
    const { workspaceId, projectId } = req.params;
    const result = await projectService.deleteProject(workspaceId, projectId, req.user.id);
    if (!result) { 
        return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
};