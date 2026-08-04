import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js"
import { createOrderController, getUserOrdersController, getOrderController, getAllOrdersController, updateOrderStatusController } from "./order.controller.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrderController);
router.get("/", authMiddleware, getUserOrdersController);

router.get("/admin", authMiddleware, adminMiddleware, getAllOrdersController);

router.get("/:id", authMiddleware, getOrderController);

router.patch("/:id/status", authMiddleware, adminMiddleware, updateOrderStatusController);

export default router;