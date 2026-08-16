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
async function deleteUser(userId) {
   return prisma.$transaction(async (tx) => {
    await tx.tasks.updateMany({
      where: {
        assignedTo: userId,
        deletedAt: null,
      },
      data: {
        assignedTo: null,
      },
    });
    await tx.projectmembers.updateMany({
      where: {
        userId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    await tx.workspacemembers.deleteMany({
      where: {
        userId,
      },
    });
    return tx.users.update({
      where: {
        id: userId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        deletedAt: true,
      },
    });
  });
}
async function getUserDashboard(userId) {
  return prisma.$transaction(async (tx) => {
    const [totalWorkspaces,ownedWorkspaces,joinedWorkspaces,totalProjects,totalCreatedTasks,totalAssignedTasks,] = await Promise.all([
      // Total workspaces user belongs to
      tx.workspaces.count({
        where: {
          deletedAt: null,
          OR: [
            {
              ownerId: userId,
            },
            {
              workspaceMembers: {
                some: {
                  userId,
                },
              },
            },
          ],
        },
      }),
      // Workspaces owned by user
      tx.workspaces.findMany({
        where: {
          ownerId: userId,
          deletedAt: null,
        },
        select: {
          id: true,
          name: true,
          description: true,
        },
      }),
      // Workspaces user joined
      tx.workspaces.findMany({
        where: {
          deletedAt: null,
          ownerId: {
            not: userId,
          },
          workspaceMembers: {
            some: {
              userId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          description: true,
        },
      }),
      // Total projects user has access to
      tx.projects.count({
        where: {
          deletedAt: null,
          OR: [
            // Projects owned/created by user
            {
              createdBy: userId,
            },
            // Projects where user is a member
            {
              projectMembers: {
                some: {
                  userId,
                  deletedAt: null,
                },
              },
            },
          ],
        },
      }),
      // Total tasks created by user
      tx.tasks.count({
        where: {
          createdBy: userId,
          deletedAt: null,
        },
      }),
      // Total tasks assigned to user
      tx.tasks.count({
        where: {
          assignedTo: userId,
          deletedAt: null,
        },
      }),
    ])
    return {
      workspaces: {
        total: totalWorkspaces,
        owned: ownedWorkspaces,
        joined: joinedWorkspaces,
      },

      projects: {
        total: totalProjects,
      },

      tasks: {
        created: totalCreatedTasks,
        assigned: totalAssignedTasks,
      },
    };
  });
}
async function ownerworkspaces(userId) {
  return prisma.workspaces.findMany({
    where: {
      deletedAt: null,
      ownerId: userId,
    },
    include: {
      workspaceMembers:true,
    }
  });
}
async function getmyprojects(workspaceId, userId) {
    return prisma.projects.findMany({
      where: {
        workspaceId,
        createdBy: userId,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        projectMembers: {
        where: {
          deletedAt: null,
        },
      }
    }
    });
  }
module.exports = {
  findByEmail,
  createUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  getUserDashboard,
  getmyprojects,
  ownerworkspaces,

};