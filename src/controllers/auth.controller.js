const authService = require('../service/auth.service');
async function register(req, res) {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
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
    return res.status(200).json({
      success:true,
      message:'User logged in successfully',
      data:result
    });
  }catch(error)
  {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
module.exports = {
  register,
  login
};