import { Env } from "./config/env.config.js";


export const OPTIONS = {
  httpOnly: true,
  secure: Env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 1000 * 60 * 60,
};
