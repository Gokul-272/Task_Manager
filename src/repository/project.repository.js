const prisma= require("../config/prisma");

async function createProject(workspaceId, data, userId) {
 const projectData = {
    ...data,
    workspaceId: workspaceId,
    createdBy: userId,
  };
  const result = await prisma.$transaction([
    prisma.projects.create({
      data: projectData,
    }),
    prisma.projectmembers.create({
        data: {
            projectId: projectData.id,
            userId: userId,
            role: 'owner',
        },
    }),
  ]);
  return result[0];
}
async function getAllProjects(workspaceId, userId, skip, limit, search) {
  const where = {
    workspaceId,
    createdBy: userId,
    deletedAt: null,

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
async function getProjectById( workspaceId, projectId, userId) {
    return prisma.projects.findFirst({
        where: {
            id: projectId,
            workspaceId: workspaceId,
            createdBy: userId,
            deletedAt: null,
        },
    });
}
async function projectById(projectId) {
    return prisma.projects.findFirst({
        where: {
            id: projectId,
            deletedAt: null,
        },
    });
}
async function updateProject(projectId, data) {
    return prisma.projects.update({
        where: { id: projectId , deletedAt: null },
        data,
    });
}
async function deleteProject(projectId) {
    const result = await prisma.$transaction([
        prisma.projects.updateMany({
            where: { id: projectId , deletedAt: null },
            data: { deletedAt: new Date() },
        }),
        prisma.projectmembers.update({
            where: { projectId: projectId ,deletedAt: null},
            data: { deletedAt: new Date() },    
        }),
    ]);
    return result[0];
}
module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  projectById,
  updateProject,
  deleteProject,
};