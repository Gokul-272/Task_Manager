const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/', require('./routes/auth.routes'));
app.use('/api/workspace', require('./routes/workspace.routes'));
app.get("/health",(req,res)=>
{
    console.log("Health check endpoint hit");
    res.status(200).json({status:"ok" , message:"health check endpoint hit"});
})
module.exports=app;