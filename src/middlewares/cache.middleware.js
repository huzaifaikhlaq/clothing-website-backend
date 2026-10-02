import redis from "../config/redis.js";

const createCacheKey = (prefix, req) => {
    const query = new URLSearchParams();

    Object.keys(req.query)
        .sort()
        .forEach((key) => {
            const value = req.query[key];

            if (value !== undefined && value !== "") {
                query.set(key, value);
            }
        });

    const queryString = query.toString();

    return queryString
        ? `${prefix}:${req.path}?${queryString}`
        : `${prefix}:${req.path}`;
};

export const cacheResponse = ({
    ttl = 60,
    keyPrefix = "cache",
}) => {
    return async (req, res, next) => {
        if (req.method !== "GET") {
            return next();
        }

        try {
            const cacheKey = createCacheKey(
                keyPrefix,
                req
            );

            const cachedData = await redis.get(cacheKey);

            // =========================
            // CACHE HIT
            // =========================

            if (cachedData !== null) {
                res.setHeader("X-Cache", "HIT");

                return res.status(200).json(
                    JSON.parse(cachedData)
                );
            }

            // =========================
            // CACHE MISS
            // =========================

            res.setHeader(
                "X-Cache",
                "MISS"
            );

            const originalJson = res.json.bind(res);

            res.json = async (body) => {
                try {
                    await redis.set(
                        cacheKey,
                        JSON.stringify(body),
                        "EX", ttl
                    );
                } catch (error) {
                    console.error(
                        "Cache write error:",
                        error
                    );
                }

                return originalJson(body);
            };

            next();

        } catch (error) {
            console.error(
                "Cache middleware error:",
                error
            );

            next();
        }
    };
};