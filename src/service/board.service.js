const boardRepository = require('../repository/board.repository');
const projectRepository = require('../repository/project.repository');
const AppError = require('../utils/AppError');

async function createBoard(projectId,userId,data) {
    const project = await projectRepository.projectById(projectId,userId);
    if (!project) {
        throw new AppError('Project not found', 404);
    }
    const board = await boardRepository.createBoard(projectId,userId,data);
    return board;
}

async function getAllBoards(projectId, userId) {
    const project = await projectRepository.isprojectmember(projectId, userId);
    if (!project) {
        throw new AppError('You are not a member of this project to get boards', 404);
    }
    const boards = await boardRepository.getBoardsByProjectId(projectId);
    return boards;
}
async function getBoardById(projectId, boardId, userId) {
    const project = await projectRepository.isprojectmember(projectId, userId);
    if (!project) {
        throw new AppError('You are not a member of this project to get board', 404);
    }
    const board = await boardRepository.getBoardById(projectId, boardId);
    if (!board) {
        throw new AppError('Board not found', 404);
    }
    return board;
}
async function updateBoard(boardId, userId, data) {
    const board = await boardRepository.BoardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not the owner of this board to update', 403);
    }
    const updatedBoard = await boardRepository.updateBoard(boardId, data);
    return updatedBoard;
}
async function deleteBoard(boardId, userId) {
    const board = await boardRepository.BoardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not the owner of this board to delete', 403);
    }
    const deletedBoard = await boardRepository.deleteBoard(boardId);
    return deletedBoard;
}
module.exports = {
    createBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
    deleteBoard
};