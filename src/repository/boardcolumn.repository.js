const prsima = require('../config/prisma');
async function getLastPosition(boardId) {
  const lastColumn = await prisma.boardColumns.findFirst({
    where: { boardId },
    orderBy: { position: 'desc' },
    select: { position: true },
  });
  return lastColumn ? lastColumn.position : -1;
}
async function createBoardColumn(boardId, data) {
    return await prisma.boardColumns.create({
        data: {
            ...data,
            boardId
        }
    });
}
async function userboardById(boardId, userId) {
    return prisma.boards.findFirst({
        where: {
            id: boardId,
            deletedAt: null,
            project: {
                members: {
                    some: {
                        userId: userId,
                    },
                },
            },
        },
    });
}async function getAllBoardColumns(boardId) {
  return prisma.boardColumns.findMany({
    where: {
      boardId,
      deletedAt: null,
    },
    orderBy: {
      position: 'asc',
    },
    include: {
      tasks: {
        where: {
          deletedAt: null,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });
}
async function getboardColumnById(boardId, columnId) {
  return prisma.boardColumns.findFirst({
    where: {
        id: columnId,
        boardId: boardId,
        deletedAt: null,
    },
  });
}
async function updateBoardColumnname(columnId, data) {
    return prisma.boardColumns.update({
        where: {
            id: columnId
        }, data: {
       name: data.name,
      }
    });
}
async function deleteBoardColumn(columnId) {
  return prisma.$transaction([
    prisma.tasks.updateMany({
      where: {
        columnId,
        deletedAt: null,
      },
      data: {
        deletedAt:new Date(),
      },
    }),
    prisma.boardColumns.update({
      where: {
        id: columnId,
      },
      data: {
        deletedAt:new Date(),
      },
    }),
  ]);
}
async function reorderBoardColumns(boardId, columnOrder) {
  return prisma.$transaction(
    columnOrder.map((columnId, index) =>
        prisma.boardColumns.update({
          where: { id: columnId },
          data: { position: index },
        })
    )
  );
}
module.exports={
    getLastPosition,
    createBoardColumn,
    getAllBoardColumns,
    userboardById,
    updateBoardColumnname,
    deleteBoardColumn,
    reorderBoardColumns,
    getboardColumnById
}