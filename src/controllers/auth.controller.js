const authService = require('../service/auth.service');
const { cookieseter,generateAccessToken,clearAuthCookies } = require('../utils/tokengenerator');
const env = require('../config/env');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  try {
    const result = await authService.register(req.body);
    cookieseter(res, result);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result.user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
async function login(req,res)
{
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
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
 async function refreshToken(req,res)
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
    {
      return res.status(401).json({
        success:false,
        message:'Invalid refresh token'
      });
    }
 }
function logout(req, res) {
  clearAuthCookies(res);
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
}
module.exports = {
  register,
  login,
  logout,
  refreshToken,
};