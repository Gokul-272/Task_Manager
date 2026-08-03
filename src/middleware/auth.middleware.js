const jwt=require('jsonwebtoken');
const env=require('../config/env');
async function authMiddleware(req,res,next){
  const authHeader = req.cookies.accessToken;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
 try{
    const decoded=jwt.verify(authHeader, env.jwtAccessSecret);
    req.user = {
    id: decoded.userId,
    };
    next();
}catch(error){
        return res.status(401).json({
            success:false,
            message:'Invalid token'
        })
    }
}
module.exports = {
    authMiddleware
};