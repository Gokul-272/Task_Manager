const prisma=require('../config/prisma');
async function createBoard(projectId,data,userId)
{
    const boardData = {
        name: data.name,
        description: data.description || null,
        projectId: projectId,
        createdBy: userId,
    };
    const board = await prisma.boards.create({ data: boardData });
    return board;
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