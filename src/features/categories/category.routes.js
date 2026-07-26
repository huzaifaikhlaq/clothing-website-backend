import express from "express";
import categoryController from "./category.controller.js";

const router = express.Router();

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategoriesById);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;