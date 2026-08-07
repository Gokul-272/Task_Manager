const prisma = require('../config/prisma');

async function findByEmail(email) {
  return prisma.users.findFirst({
    where: {
      email,
      deletedAt: null,
    },
  });
}

async function createUser(data) {
  return prisma.users.create({
    data,
  });
}
async function getCurrentUser(id) {
  return prisma.users.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
}

async function updateUser(userId, data) {
  return prisma.users.update({
    where: {
      id: userId,
    },
    data,
  });
}

module.exports = {
  findByEmail,
  createUser,
  getCurrentUser,
  updateUser,
};