const prisma=require('../config/prisma');
async function createTask(columnId, data, userId) {
    return await prisma.tasks.create({
        data: {
            ...data,
            columnId,
            createdBy: userId
        }
    });
}
async function getAllTasks(boardId, columnId, userId, options) {
  const { skip, limit,priority, search, status, assignedTo } = options;
  return prisma.tasks.findMany({
    where: {
      boardId,
      deletedAt: null,
      ...(columnId && { columnId }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(priority && { priority }),
      ...(assignedTo && { assignedTo: assignedTo }),
      ...(status && { status }),
    },
    skip,
    take: limit,
    orderBy: columnId ? { position: 'asc' }:[{ columnId: 'asc' },{ position: 'asc' },],
  });
}
async function getTaskById(columnId, taskId) {
    return prisma.tasks.findFirst({
        where: {
            id: taskId,
            columnId: columnId,
            deletedAt: null,
        },
    });
}
async function updateTask(columnId, taskId, data) {
    return prisma.tasks.updateMany({
        where: {
            id: taskId,
            columnId: columnId,
            deletedAt: null,
        },
        data: data
    });
}
async function moveTask(columnId, taskId, newColumnId, newPosition) {
    return prisma.$transaction(async (tx) => {
    const task = await tx.tasks.findFirst({
      where: {
        id: taskId,
        columnId: columnId,
        deletedAt: null,
      },
    });
    if (!task) {
      return null;
    }
    const lastTask = await tx.tasks.findFirst({
      where: {
        columnId: newColumnId,
        deletedAt: null,
      },
      orderBy: {
        position: 'desc',
      },
    });
    const maxPosition =lastTask?lastTask.position + 1:0;
    if (newPosition < 0 || newPosition > maxPosition) {
      return null;
    }
    await tx.tasks.updateMany({
      where: {
        columnId: task.columnId,
        deletedAt: null,
        position: {
          gt: task.position,
        },
      },
      data: {
        position: {
          decrement: 1,
        },
      },
    });
    await tx.tasks.updateMany({
      where: {
        columnId: newColumnId,
        deletedAt: null,
        position: {
          gte: newPosition,
        },
      },
      data: {
        position: {
          increment: 1,
        },
      },
    });

    return tx.tasks.update({
      where: {
        id: task.id,
      },
      data: {
        columnId: newColumnId,
        position: newPosition,
      },
      include: {
        column: true,
      },
    });
  });
}    
module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    moveTask
};