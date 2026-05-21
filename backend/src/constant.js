import { Env } from "./config/env.config.js";


export const OPTIONS = {
  httpOnly: true,
  secure: Env.NODE_ENV === "production",
  sameSite: Env.NODE_ENV === "production" ? "none" :"lax",
  maxAge: 1000 * 60 * 60,
};
