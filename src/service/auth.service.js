const bcrypt = require('bcrypt');
const env = require('../config/env');
const userRepository = require('../repository/user.repository');
const { generateTokens } = require('../utils/tokengenerator');


async function register({ fullName, email, password }) {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error('Email already registered');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({fullName,email,password: hashedPassword});
  const { accessToken, refreshToken } = generateTokens(user);

  return {
    user: { id: user.id, fullName: user.fullName, email: user.email },
    accessToken,
    refreshToken,
  };
}

async function login({ email, password })
{
  const user = await userRepository.findByEmail(email);
  if(!user)
  {
    throw new Error('Invalid email or password');
  }
  const match=await bcrypt.compare(password,user.password)
  if(!match)
  {
    throw new Error('Invalid email or password');
  }
  const { accessToken, refreshToken } = generateTokens(user);
  return {
    user: {id: user.id, fullName: user.fullName, email: user.email},
    accessToken,
    refreshToken,
  };
}
module.exports = {
  register,
  login
};