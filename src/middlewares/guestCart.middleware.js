import { randomUUID } from "crypto";

export const guestCartMiddleware = (req, res, next) => {

    if (req.user?.id) {
        req.guestId = null;
        return next();
    }

    let guestId = req.cookies?.guestId;

    if (!guestId) {
        guestId = randomUUID();

        res.cookie("guestId", guestId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
        });
    }

    req.guestId = guestId;

    next();
};