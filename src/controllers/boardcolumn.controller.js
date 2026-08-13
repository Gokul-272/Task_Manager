const boardcolumnService=require('../service/boardcolumn.service');
const createBoardColumn=async(req,res,next)=>{
  try{
    const {boardId}=req.params;
    const userId=req.user.id;
    const column=await boardcolumnService.createBoardColumn(boardId,userId,req.body);
    res.status(201).json({
        success:true,
        message:'Board column created successfully',
        data:column
    });
  }catch(error){
     next(error);}
};
const getAllBoardColumns=async(req,res,next)=>{
    try{
        const {boardId}=req.params;
        const userId=req.user.id;
        const columns=await boardcolumnService.getAllBoardColumns(boardId,userId);
        res.status(200).json({
            success:true,
            message:'Board columns retrieved successfully',
            data:columns
        });
    }catch(error){
        next(error);
    }
};
const reorderBoardColumns=async(req,res,next)=>{
    try{
        const {boardId}=req.params;
        const userId=req.user.id;
        const {orderedColumnIds}=req.body;
        const result=await boardcolumnService.reorderBoardColumns(boardId,userId,orderedColumnIds);
        res.status(200).json({
            success:true,
            message:'Board columns reordered successfully',
            data:result
        });
    }catch(error){
        next(error);
    }
};
const updateBoardColumnname=async(req,res,next)=>{
    try{
        const {boardId,columnId}=req.params;
        const userId=req.user.id;
        const result=await boardcolumnService.updateBoardColumnname(boardId,columnId,userId,req.body);
        res.status(200).json({
            success:true,
            message:'Board column name updated successfully',
            data:result
        });
    }catch(error){
        next(error);
    }
};
const deleteBoardColumn=async(req,res,next)=>{
    try{
        const {boardId,columnId}=req.params;
        const userId=req.user.id;
        const result=await boardcolumnService.deleteBoardColumn(boardId,columnId,userId);
        res.status(200).json({
            success:true,
            message:'Board column deleted successfully',
            data:result
        });
    }catch(error){
        next(error);
    }
};
module.exports={
    createBoardColumn,
    getAllBoardColumns,
    reorderBoardColumns,
    updateBoardColumnname,
    deleteBoardColumn
};