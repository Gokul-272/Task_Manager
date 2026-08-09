const bcrypt = require('bcrypt');
const env = require('../config/env');
const userRepository = require('../repository/user.repository');
const { generateTokens } = require('../utils/tokengenerator');
const AppError = require('../utils/AppError');

async function register({ fullName, email, password }) {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError('Email already registered', 409);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({ fullName, email, password: hashedPassword });
  const { accessToken, refreshToken } = generateTokens(user);

  return {
    user: { id: user.id, fullName: user.fullName, email: user.email },
    accessToken,
    refreshToken,
  };
}

async function login({ email, password }) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError('Invalid email or password', 401);
  }
  const { accessToken, refreshToken } = generateTokens(user);
  return {
    user: { id: user.id, fullName: user.fullName, email: user.email },
    accessToken,
    refreshToken,
  };
}

module.exports = {
  register,
  login,
};