const taskRepository = require('../repository/task.repository');
const AppError = require('../utils/AppError');
const boardRepository = require('../repository/board.repository');
const boardcolumnrepository = require('../repository/boardcolumn.repository');
async function createTask(boardId, columnId, userId, taskData) {
    const board = await boardRepository.BoardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not a owner of this board to create task', 403);
    }
    const column = await boardcolumnrepository.getboardColumnById(boardId, columnId);
    if (!column) {
        throw new AppError('Column not found in this board', 404);
    }
    const task = await taskRepository.createTask(columnId, taskData, userId);
    if (!task) {
        throw new AppError('Failed to create task', 500);
    }
    return task;
};
async function getAllTasks(boardId, columnId, userId, options) {
    const board = await boardcolumnrepository.userboardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not a member of this board to view tasks', 403);
    }
    if (columnId) {
    const column = await boardcolumnrepository.getboardColumnById(boardId, columnId);
    if (!column) {
        throw new AppError('Column not found in this board', 404);
    } 
    }
    const tasks = await taskRepository.getAllTasks(boardId, columnId, userId, options);
    if (!tasks || tasks.length === 0) {
        throw new AppError('No tasks found for this board/column', 404);
    }
    return tasks;
};
async function getTaskById(boardId, columnId, taskId, userId) {
    const board = await boardcolumnrepository.userboardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not a member of this board to view this task', 403);
    }
    const task = await taskRepository.getTaskById(columnId, taskId);
    if (!task) {
        throw new AppError('Task not found or you do not have access to this task', 404);
    }
    return task;
};
async function updateTask(boardId, columnId, taskId, userId, taskData) {
    const board = await boardRepository.BoardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not a owner of this board to update this task', 403);
    }
    const taskcheck = await taskRepository.getTaskById(columnId, taskId);
    if (!taskcheck) {
        throw new AppError('Task not found ', 404);
    }
    const task = await taskRepository.updateTask(taskId, taskData);
    if (!task) {
        throw new AppError('Failed to update task',500);
    }
    return task;
}
async function moveTask(boardId, columnId, taskId, userId, newColumnId, newPosition, orderedTaskIds) {
    const board = await boardcolumnrepository.userboardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not a member of this board to move this task', 403);
    }
    const column = await boardcolumnrepository.getboardColumnById(boardId, columnId);
    if (!column) {
        throw new AppError('Source column not found in this board', 404);
    }
   if (columnId === newColumnId) {
    const result = await taskRepository.reorderTasks(columnId, orderedTaskIds);
    if (!result) {
      throw new AppError('Reorder operation failed', 500);
    }
    return result;
   }
    const targetColumn = await boardcolumnrepository.getboardColumnById(boardId, newColumnId);
    if (!targetColumn) {
        throw new AppError('Target column not found in this board', 404);
    }
    const task = await taskRepository.moveTask(columnId, taskId, newColumnId, newPosition);
    if (!task) {
        throw new AppError('Move operation failed. Task not found or invalid target column/position.', 500);
    }
    return task;
}
async function deleteTask(boardId, columnId, taskId, userId) {
    const board = await boardRepository.BoardById(boardId, userId);
    if (!board) {
        throw new AppError('You are not a owner of this board to delete this task', 403);
    }
    const deletedTask = await taskRepository.deleteTask(columnId, taskId);
    if (!deletedTask) {
        throw new AppError('Incorrect task ID or Delete operation failed', 500);
    }
    return deletedTask;
}
module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    moveTask,
    deleteTask
};
