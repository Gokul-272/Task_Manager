const userService = require('../service/user.service');

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await userService.getCurrentUser(req.user.id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.user.id, req.body);
    return res.status(200).json({
      success: true,
      message: 'User Data updated successfully',
      data: updatedUser,
    });
  }
  catch (error) {
    next(error);
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(req.user.id);
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
}
const getUserDashboard = async (req, res, next) => {
  try {
    const dashboardData = await userService.getUserDashboard(req.user.id);
    return res.status(200).json({
      success: true,
      data: dashboardData,
    });
  }
  catch (error) {
    next(error);
  }
}
const myownedWorkspaces = async (req, res, next) => {
  try {
    const ownedWorkspaces = await userService.myownedWorkspaces(req.user.id);
    if(ownedWorkspaces.length === 0){
      return res.status(200).json({
        success: true,
        message: 'No owned workspaces found',
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      data: ownedWorkspaces,
    });
  }
  catch (error) {
    next(error);
  }
}
const getmyprojects = async (req, res, next) => {
  try {
    const workspaceId = req.params.workspaceId;
    const projects = await userService.getmyprojects(workspaceId, req.user.id);
    return res.status(200).json({
      success: true,
      data: projects,
    });
  }
  catch (error) {
    next(error);
  }
}
module.exports = {
  getCurrentUser,
  updateUser,
  deleteUser,
  getUserDashboard,
  myownedWorkspaces,
  getmyprojects
};