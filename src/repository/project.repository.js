const prisma= require("../config/prisma");

async function createProject(workspaceId, data, userId) {
  return prisma.$transaction(async (tx) => {

    const project = await tx.projects.create({
      data: {
        name: data.name,
        description: data.description || null,
        workspaceId,
        createdBy: userId,
      },
    });

    await tx.projectmembers.create({
      data: {
        projectId: project.id,
        userId,
        role: 'owner',
        addedBy: userId,
      },
    });
    return project;
  });
}
async function getAllProjects(workspaceId,userId, skip, limit, search, status) {
  const where = {
    workspaceId,
    deletedAt: null,
    projectMembers: {
      some: {
        userId: userId,
      },
    },
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    }),
    ...(status && {
      status,
    }),
  };

  const [projects, total] = await prisma.$transaction([
    prisma.projects.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.projects.count({ where }),
  ]);

  return { projects, total };
}
async function getProjectById( workspaceId, projectId) {
    return prisma.projects.findFirst({
        where: {
            id: projectId,
            workspaceId: workspaceId,
            deletedAt: null,
        },
    });
}

async function projectById(projectId, userId) {
    return prisma.projects.findFirst({
        where: {
            id: projectId,
            createdBy: userId,
            deletedAt: null,
        },
    });
}
async function updateProject(projectId, data) {
    return prisma.projects.update({
        where: { id: projectId },
        data,
    });
}
async function deleteProject(projectId) {
    const result = await prisma.$transaction([
        prisma.projects.update({
            where: { id: projectId },
            data: { deletedAt: new Date() },
        }),
        prisma.projectmembers.updateMany({
            where: { projectId: projectId ,deletedAt: null},
            data: { deletedAt: new Date() },    
        }),
    ]);
    return result[0];
}
async function findbyId(workspaceId, projectId, userId) {
    return prisma.projects.findFirst({
        where: {
            id: projectId,
            workspaceId: workspaceId,
            createdBy: userId,
            deletedAt: null,
        },
    });
}
//board check

async function isprojectmember(projectId, userId) {
    return prisma.projectmembers.findFirst({
        where: {
            projectId: projectId,
            userId: userId,
            deletedAt: null,
        },
    });
}
module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  projectById,
  updateProject,
  deleteProject,
  findbyId,
  isprojectmember
};