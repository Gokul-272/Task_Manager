const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', require('./routes/auth.routes'));
app.use('/api/workspace', require('./routes/workspace.routes'));
app.use('/api/workspacemembers', require('./routes/workspacemember.routes'));
app.get("/health",(req,res)=>
{
    console.log("Health check endpoint hit");
    res.status(200).json({status:"ok" , message:"health check endpoint"});
})
module.exports=app;