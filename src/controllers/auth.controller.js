const authService = require('../service/auth.service');
const { cookieseter,generateAccessToken,clearAuthCookies } = require('../utils/tokengenerator');
const env = require('../config/env');
const jwt = require('jsonwebtoken');

const register =async(req, res,next) => {
  try {
    const result = await authService.register(req.body);
    cookieseter(res, result);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result.user
    });
  } catch (error) {
    next(error);
  }
}
const login =async(req,res,next) => {
  try{
    const result=await authService.login(req.body);
    cookieseter(res, result);
    return res.status(200).json({
      success:true,
      message:'User logged in successfully',
      data:result.user,
    }); 
  }catch(error)
  {
   next(error);
  }
}
async function refreshToken(req,res,next)
 {
     const refreshToken=req.cookies.refreshToken;
     if(!refreshToken)
     {
        return res.status(401).json({
          success:false,
          message:"Refresh token not found"
        });
     }
    try{
      const payload = jwt.verify(refreshToken, env.jwtRefreshSecret);
      const newAccessToken = generateAccessToken({ id: payload.userId });
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      }).status(200).json({
        success:true,
        message:'Token refreshed successfully',
        data:{ accessToken: newAccessToken }
      });
    }catch(error)
    {next(error);
    }
 }
function logout(req, res,next) {
  try{
    clearAuthCookies(res);
    return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
  }
  catch(error)
  {
     next(error);
  }
}
module.exports = {
  register,
  login,
  logout,
  refreshToken,
};