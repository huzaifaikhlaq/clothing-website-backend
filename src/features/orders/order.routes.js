import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js"

import { createOrderController, getUserOrdersController, getOrderController } from "./order.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createOrderController);
router.get("/", authMiddleware, getUserOrdersController);
router.get("/:id", authMiddleware, getOrderController);

export default router;