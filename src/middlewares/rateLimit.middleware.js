import redis from "../config/redis.js";

export const rateLimit = ({
    limit,
    windowSeconds,
    keyPrefix = "rate-limit",
}) => {
    return async (req, res, next) => {

        // Do not rate-limit CORS preflight requests
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const ip = req.ip;
            const key = `${keyPrefix}:${ip}`;

            // Run INCR and TTL together
            const pipeline = redis.pipeline();

            pipeline.incr(key);
            pipeline.ttl(key);

            const [count, currentTtl] = await pipeline.exec();

            let ttl = currentTtl;

            // First request creates the key, so give it an expiry.
            if (count === 1) {
                await redis.expire(key, windowSeconds);

                // TTL was checked before EXPIRE was applied.
                ttl = windowSeconds;
            }

            const remaining = Math.max(0, limit - count);

            // Rate-limit headers
            res.setHeader(
                "X-RateLimit-Limit",
                limit
            );

            res.setHeader(
                "X-RateLimit-Remaining",
                remaining
            );

            res.setHeader(
                "X-RateLimit-Reset",
                Math.max(0, ttl)
            );

            if (count > limit) {
                res.setHeader(
                    "Retry-After",
                    Math.max(1, ttl)
                );

                return res.status(429).json({
                    success: false,
                    message: "Too many requests. Please try again later.",
                    retryAfter: Math.max(1, ttl),
                });
            }

            next();

        } catch (error) {
            console.error("Rate limiter error:", error);

            next();
        }
    };
};