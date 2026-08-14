const {z}=require('zod');
const createTaskSchema=z.object({
    params:z.object({
        columnId:z.string().uuid({message:'Invalid column ID'}),
        boardId:z.string().uuid({message:'Invalid board ID'}),
    }),
    body:z.object({
    title:z.string().min(3,{message:'Title is required'}),
    description:z.string().optional(),
    dueDate:z.string().datetime().optional(),
    priority:z.enum(['LOW','MEDIUM','HIGH']).default('LOW'),
    assigneeId:z.string().optional()
    })
});
const updateTaskSchema=z.object({
    params:z.object({
        taskId:z.string().uuid({message:'Invalid task ID'})
    }),
    body:z.object({
    title:z.string().min(3,{message:'Title is required'}).optional(),
    description:z.string().optional(),
    dueDate:z.string().datetime().optional(),
    priority:z.enum(['LOW','MEDIUM','HIGH']).default('LOW'),
    assigneeId:z.string().optional()
    })
});
const moveTaskSchema=z.object({
    params:z.object({
        taskId:z.string().uuid({message:'Invalid task ID'}),
    }),
    body:z.object({
    targetColumnId:z.string().uuid({message:'Invalid target column ID'}),
    targetPosition:z.number().int().min(0,{message:'Target position must be a non-negative integer'}),
    orderedTaskIds:z.array(z.string()).min(1,{message:'At least one task ID is required'}).optional()
    })
    .refine((data) =>data.targetPosition !== undefined ||data.orderedTaskIds !== undefined,{message: 'Provide either targetPosition or orderedTaskIds',path: ['targetPosition'],}
    ),
});
module.exports={
    createTaskSchema,
    updateTaskSchema,
    moveTaskSchema
};

