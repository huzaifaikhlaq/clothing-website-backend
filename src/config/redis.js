import Redis from "ioredis";

if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL is not configured");
}

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
    console.log("Redis connected");
});

redis.on("error", (error) => {
    console.error("Redis error:", error);
});

export default redis;