const workspaceService = require('../service/workspace.service');
const createWorkspace = async (req, res, next) => {
  try {
    console.log(req.user);
    const result = await workspaceService.createWorkspace(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: 'Workspace created successfully',
      data: result
    });
  } catch (error) {
     console.error("CREATE WORKSPACE ERROR:", error);
     console.error("STACK:", error.stack);
     next(error);
  }
};
const getAllWorkspaces = async (req, res, next) => {
  try {
    const result = await workspaceService.getAllWorkspaces(req.user.id);
    res.status(200).json({
      success: true,
      message: 'Workspaces retrieved successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
const getWorkspaceById = async (req, res, next) => {
  try {
    console.log('Controller:', req.params.id, req.user.id);
    const result = await workspaceService.getWorkspaceById(req.params.id, req.user.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Workspace not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Workspace retrieved successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
const updateWorkspace = async (req, res, next) => {
  try {
    console.log('Controller:', req.body);
    const result = await workspaceService.updateWorkspace(req.params.id, req.body, req.user.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Workspace not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Workspace updated successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
const deleteWorkspace = async (req, res, next) => {
  try {
    const result = await workspaceService.deleteWorkspace(req.params.id, req.user.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Workspace not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Workspace deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace
}