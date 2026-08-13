const boardcolumnrepository = require('../repository/boardcolumn.repository');
const AppError = require('../utils/AppError');
const boardrepository = require('../repository/board.repository');
async function createBoardColumn(boardId, userId, data) {
    const board = await boardrepository.BoardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not the owner of this board to create column', 403);
    }
    const lastPosition = await boardcolumnrepository.getLastPosition(boardId);
    const column = await boardcolumnrepository.createBoardColumn(boardId, {
    ...data,
    position: lastPosition + 1,
  });
    return column;
}

async function getAllBoardColumns(boardId,userId) {
    const board = await boardcolumnrepository.userboardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not a member of this board to view columns', 403);
    }
    return await boardcolumnrepository.getAllBoardColumns(boardId);
}
async function updateBoardColumnname(boardId, columnId, userId, data) {
    const board = await boardrepository.BoardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not the owner of this board to update column name', 403);
    }

    const column = await boardcolumnrepository.updateBoardColumnname(columnId, data);
    if (!column) {
        throw new AppError('Column not found', 404);
    }
    return column;
}
async function deleteBoardColumn(boardId, columnId, userId) {
    const board = await boardrepository.BoardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not the owner of this board to delete column', 403);
    }
    const column = await boardcolumnrepository.deleteBoardColumn(columnId);
    if (!column) {
        throw new AppError('Column not found', 404);
    }
    return column;
}
async function reorderBoardColumns(boardId, userId, columnOrder) {
    const board = await boardrepository.BoardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not the owner of this board to reorder columns', 403);
    }
    const updatedColumns = await boardcolumnrepository.reorderBoardColumns(boardId, columnOrder);
    return updatedColumns;
}
module.exports = {
    createBoardColumn,
    getAllBoardColumns,
    updateBoardColumnname,
    deleteBoardColumn,
    reorderBoardColumns
};