const boardService = require('../service/board.service');
const createBoard = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const board = await boardService.createBoard(projectId,userId,req.body);
    res.status(201).json({
      success: true,
      message: 'Board created successfully',
      data: board
    });
  } catch (error) {
    next(error);
  }
};
const getAllBoards = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const boards = await boardService.getAllBoards(projectId, userId);
    res.status(200).json({
      success: true,
      message: 'Boards retrieved successfully',
      data: boards
    });
  }
    catch (error) {
    next(error);
  }
};
const getBoardById = async (req, res, next) => {
  try {
    const { projectId, boardId } = req.params;
    const userId = req.user.id;
    const board = await boardService.getBoardById(projectId, boardId, userId);
    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Board not found'
      });
    } 
    res.status(200).json({
      success: true,
      message: 'Board retrieved successfully',
      data: board
    });
  } 
    catch (error) {
    next(error);
  }
};
const updateBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const userId = req.user.id;
    const updatedBoard = await boardService.updateBoard(boardId, userId, req.body);
    if (!updatedBoard) {
      return res.status(404).json({
        success: false,
        message: 'Board not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Board updated successfully',
      data: updatedBoard
    });
  }
    catch (error) {
    next(error);
  }
};
const deleteBoard = async (req, res, next) => {
  try {
    const {boardId } = req.params;
    const userId = req.user.id;
    const deletedBoard = await boardService.deleteBoard(boardId, userId);
    if (!deletedBoard) {
      return res.status(404).json({
        success: false,
        message: 'Board not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Board deleted successfully',
      data: deletedBoard
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard
};