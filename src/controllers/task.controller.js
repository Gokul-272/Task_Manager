const taskservice = require('../service/task.service');
const createTask = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.params;
    const userId = req.user.id;
    const task = await taskservice.createTask(boardId, columnId, userId, req.body);
    res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task
    });
  } catch (error) {
    next(error);
  }
};
const getAllTasks=async(req,res,next)=>
{
    try {
        const {boardId,columnId}=req.params;
        const userId=req.user.id;
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||10;
        const search=req.query.search||'';
        const skip=(page-1)*limit;
        const status=req.query.status;
        const assignedTo=req.query.assignedTo;
        const priority=req.query.priority;
        const tasks=await taskservice.getAllTasks(boardId,columnId,userId,{skip,limit,priority,search,status,assignedTo});
        res.status(200).json({
            success:true,
            message:'Tasks retrieved successfully',
            data:tasks
        });
    } catch (error) {
        next(error);
    }
};
const getTaskById=async(req,res,next)=>
{
    try {
        const {boardId,columnId,taskId}=req.params;
        const userId=req.user.id;
        const task=await taskservice.getTaskById(boardId,columnId,taskId,userId);
        if(!task)
        {
            return res.status(404).json({
                success:false,
                message:'Task not found'
            });
        }
        res.status(200).json({
            success:true,
            message:'Task retrieved successfully',
            data:task
        });
    } catch (error) {
        next(error);
    }
};

const updateTask=async(req,res,next)=>
{
    try {
        const {boardId,columnId,taskId}=req.params;
        const userId=req.user.id;
        const task=await taskservice.updateTask(boardId,columnId,taskId,userId,req.body);
        if(!task)
        {
            return res.status(404).json({
                success:false,
                message:'Task not found'
            });
        }
        res.status(200).json({
            success:true,
            message:'Task updated successfully',
            data:task
        });
    } catch (error) {
        next(error);
    }
};
const moveTask=async(req,res,next)=>
{
    try{
        const {boardId,columnId,taskId}=req.params;
        const userId=req.user.id;
        const {targetColumnId,targetPosition,orderedTaskIds}=req.body;
        const task=await taskservice.moveTask(boardId,columnId,taskId,userId,targetColumnId,targetPosition,orderedTaskIds);
        if(!task)
        {
            return res.status(404).json({
                success:false,
                message:'Move operation failed. Task not found or invalid target column/position.'
            });
        }
        res.status(200).json({
            success:true,
            message:'Task moved successfully',
            data:task
        });
    } catch (error) {
        next(error);
    }
};
const deleteTask=async(req,res,next)=>
{
    try {
        const {boardId,columnId,taskId}=req.params;
        const userId=req.user.id;
        const task=await taskservice.deleteTask(boardId,columnId,taskId,userId);
        if(!task)
        {
            return res.status(404).json({
                success:false,
                message:'Task not found'
            });
        }
        res.status(200).json({
            success:true,
            message:'Task deleted successfully',
            data:task
        });
    } catch (error) {
        next(error);
    }
};
module.exports={
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    moveTask,
    deleteTask
};