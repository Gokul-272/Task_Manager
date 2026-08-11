const {z}=require('zod');
const createBoardSchema=z.object({
  name:z.string().min(3,{message:'Board name is required'}),
  description:z.string().optional(),
});
const updateBoardSchema=z.object({
  name:z.string().min(3,{message:'Board name is required'}).optional(),
  description:z.string().optional(),
});
module.exports={createBoardSchema,updateBoardSchema};