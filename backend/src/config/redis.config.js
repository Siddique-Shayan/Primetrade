import { createClient } from "redis";
import { Env } from "./env.config.js";

const redisClient = createClient({
    url: Env.REDIS_URL
});

redisClient.on("error", (err) => {
    console.log("❌ Redis Error:", err);
});

redisClient.on("connect", () => {
    console.log("✅✅ Redis Connected Successfully");
});

const connectRedis = async () => {
    try {

        await redisClient.connect();

    } catch (error) {

        console.log(
            "❌❌ Error connecting Redis.",
            error
        );

        process.exit(1);
    }
};

export {
    redisClient,
    connectRedis
};