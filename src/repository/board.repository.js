const prisma=require('../config/prisma');
async function createBoard(projectId, data, userId) {
  const { name, description, columns } = data;
  const defaultColumns = ['Todo', 'In Progress', 'Review', 'Done'];
  const boardColumns = Array.isArray(columns) && columns.length > 0 ? columns : defaultColumns;
  return prisma.$transaction(async (tx) => {
    const board = await tx.boards.create({
      data: {
        projectId,
        name,
        description:description || null,
        createdBy: userId,
      },
    });
    await tx.boardcolumns.createMany({
      data: boardColumns.map((columnName, index) => ({
        boardId: board.id,
        name: columnName,
        position: index,
      })),
    });
    return tx.boards.findUnique({
      where: { id: board.id },
      include: {
        boardColumns: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  });
}

async function getBoardsByProjectId(projectId) {
    return prisma.boards.findMany({
        where: {
            projectId: projectId,
            deletedAt: null,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
}
async function getBoardById(projectId, boardId) {
    return prisma.boards.findFirst({
        where: {
            id: boardId,
            projectId: projectId,
            deletedAt: null,
        },
    });
}
async function BoardById(boardId, userId) {
    return prisma.boards.findFirst({
        where: {
            id: boardId,
            createdBy: userId,
            deletedAt: null,
        },
    });
}   
async function updateBoard(boardId, data) {
    return prisma.boards.update({
        where: {
            id: boardId
        },
        data: data
    });
}
async function deleteBoard(boardId) {
    const [board]=await prisma.$transaction([
    prisma.boards.update({
        where: {
            id: boardId
        },
        data: {
            deletedAt: new Date()
        }
    }),
    prisma.tasks.updateMany({
        where: {
            boardId: boardId,
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }
    })
]);
    return board;
}
module.exports={createBoard, getBoardsByProjectId, getBoardById,BoardById, updateBoard, deleteBoard};