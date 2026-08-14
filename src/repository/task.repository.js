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
async function updateTask(taskId, data) {
    return prisma.tasks.update({
        where: {
            id: taskId,
        },
        data: data
    });
}
async function moveTask(columnId, taskId, newColumnId, newPosition) {
  const result = await prisma.$transaction(async (tx) => {
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
    if(newColumnId === columnId && newPosition === task.position) {
      return task;
    }
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
  return result;
}    
async function reorderTasks(columnId, orderedTaskIds) {
    return prisma.$transaction(async (tx) => {
      const tasks = await tx.tasks.findMany({
        where: {
          id: { in: orderedTaskIds },
          columnId: columnId,
          deletedAt: null,
        },
      });
      const uniqueIds = new Set(orderedTaskIds);
      if (tasks.length !== orderedTaskIds.length && uniqueIds.size !== orderedTaskIds.length) {
        return null;
      }
      for (let i = 0; i < orderedTaskIds.length; i++) {
      await tx.tasks.update({
        where: { id: orderedTaskIds[i] },
        data: { position: i },
      });
    }
    return tx.tasks.findMany({
      where: {
        columnId,
        deletedAt: null,
      },
      orderBy: {
        position: 'asc',
      },
    });
  });
}
async function deleteTask(columnId, taskId) {
    return prisma.$transaction(async (tx) => {
      const task = await tx.tasks.findFirst({
        where: {
          id: taskId,
          columnId: columnId,
          deletedAt: null,
        },
      });
      if(!task) {
        return null;
      }
      await tx.tasks.update({
        where: {
          id: taskId,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      const result = await tx.tasks.updateMany({
        where: {
          columnId: columnId,
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
      return task;
    });
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    moveTask,
    reorderTasks,
    deleteTask
};