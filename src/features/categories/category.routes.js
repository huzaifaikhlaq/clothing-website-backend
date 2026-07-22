import express from "express";
import categoryController from "./category.controller.js";

const router = express.Router();

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);

export default router;