const dotenv = require('dotenv');
const { z } = require('zod');
dotenv.config();
const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  REDIS_URL: z.string().url()
});
const env = envSchema.parse(process.env);
module.exports = {
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  redisUrl: env.REDIS_URL,
  jwtAccessSecret: env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: env.JWT_REFRESH_SECRET,
  jwtAccessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
  jwtRefreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
};