const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Only admin can access this route"
        });
    }

    next();
};

export default adminMiddleware;