const BoardRouter = require('express').Router({mergeParams:true});
const boardController = require('../controllers/board.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createBoardSchema, updateBoardSchema } = require('../validators/board.validator');

BoardRouter.post('/', authMiddleware, validate(createBoardSchema), boardController.createBoard);
BoardRouter.get('/', authMiddleware, boardController.getAllBoards);
BoardRouter.get('/:boardId', authMiddleware, boardController.getBoardById);
BoardRouter.put('/:boardId', authMiddleware, validate(updateBoardSchema), boardController.updateBoard);
BoardRouter.delete('/:boardId', authMiddleware, boardController.deleteBoard);
module.exports = BoardRouter;