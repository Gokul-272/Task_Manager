const userrepository = require('../repository/user.repository');
async function getCurrentUser(userId) {
  return userrepository.getCurrentUser(userId);
}
async function updateUser(userId, data) {
    return userrepository.updateUser(userId, data);
}
module.exports = {
  getCurrentUser,
  updateUser
};