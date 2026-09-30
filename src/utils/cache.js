import redis from "../config/redis.js";

//  Delete specific cache keys.
export const deleteCache = async (keys = []) => {
    if (!keys.length) {
        return;
    }

    try {
        await redis.del(...keys);
    } catch (error) {
        console.error(
            "Cache deletion error:",
            error
        );
    }
};

// Delete keys matching a pattern.

export const deleteCacheByPattern = async (pattern) => {
    try {
        let cursor = "0";

        do {
            const result = await redis.scan(cursor, {
                match: pattern,
                count: 100,
            });

            cursor = result[0];

            const keys = result[1];

            if (keys.length > 0) {
                await redis.del(...keys);
            }

        } while (cursor !== "0");

    } catch (error) {
        console.error(
            "Pattern cache deletion error:",
            error
        );
    }
};