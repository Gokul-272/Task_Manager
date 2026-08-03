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
module.exports = {
  findByEmail,
  createUser,
};