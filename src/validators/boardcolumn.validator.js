const {z}=require('zod');
const createBoardColumnSchema=z.object({ 
    params:z.object({
        projectId:z.string().uuid(),
        boardId:z.string().uuid()
    }),
    title:z.string().min(2).max(100)
});
const updateBoardColumnnameSchema=z.object({ 
    params:z.object({
        projectId:z.string().uuid(),
        boardId:z.string().uuid(),
        columnId:z.string().uuid()
    }),
    title:z.string().min(2).max(100)
});
const reorderBoardColumnSchema=z.object({
    params:z.object({
        projectId:z.string().uuid(),
        boardId:z.string().uuid()
    }),
    orderedColumnIds:z.array(z.string().uuid())
});
module.exports={createBoardColumnSchema,updateBoardColumnnameSchema,reorderBoardColumnSchema};