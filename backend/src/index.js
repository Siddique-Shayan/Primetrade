import "dotenv/config";

import { app } from "./app.js";
import { Env } from "./config/env.config.js";
import connectDB from "./config/database.config.js";
import { connectRedis } from "./config/redis.config.js";

const PORT = Env.PORT || 8000;


connectDB()
  .then(() => {
    connectRedis()
      .catch((err) => {
        console.log('❌❌ Error connecting Redis')
      })
    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT} on ${Env.NODE_ENV} mode.`
      );
    });
  })
  .catch(err => {
    console.log("❌❌ Error connecting DB.");
  });
