const userService = require('../service/user.service');

async function getCurrentUser(req, res) {
  try {
    const user = await userService.getCurrentUser(req.user.id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
} 
  async function updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.user.id, req.body);
      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
      });
    }
    catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
}

module.exports = {
  getCurrentUser,
  updateUser
};