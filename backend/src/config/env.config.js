import { getEnv } from "../utils/get-env.js";

const envConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),

  PORT: getEnv("PORT", "8001"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  MONGODB_URI: getEnv("MONGODB_URI"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),

  ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRY: getEnv("ACCESS_TOKEN_EXPIRY"),

  REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
  REFRESH_TOKEN_EXPIRY: getEnv("REFRESH_TOKEN_EXPIRY"),

  REDIS_URL : getEnv("REDIS_URL")
});

export const Env = envConfig();
