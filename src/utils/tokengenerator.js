const jwt = require('jsonwebtoken');
const env = require('../config/env');
function generateTokens(user) {
const payload = {userId: user.id};
  const accessToken = jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiresIn,
  });
  const refreshToken = jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn,
  });
  return { accessToken, refreshToken };
}
const cookieoptions={
      httpOnly: true,
      secure: false,
      sameSite: 'lax', 
    }
function cookieseter(res, result){
  res.cookie('accessToken', result.accessToken, { ...cookieoptions, maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', result.refreshToken, {...cookieoptions,maxAge: 7 * 24 * 60* 60 * 1000});

}
function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiresIn,
  });
}
function clearAuthCookies(res) {
  res.clearCookie("accessToken", cookieoptions);
  res.clearCookie("refreshToken", cookieoptions);
}
module.exports = {
  generateTokens,
  cookieseter,
  generateAccessToken,
  clearAuthCookies
};
