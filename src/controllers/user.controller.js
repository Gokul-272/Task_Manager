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

module.exports = {
  getCurrentUser,
  updateUser
};