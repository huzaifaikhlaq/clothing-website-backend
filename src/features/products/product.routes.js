import express from "express";

import productController from "./product.controller.js";
import productValidation from "./product.validation.js";
import validate from "../../middlewares/validation.middleware.js";
// import upload from "../../middlewares/upload.middleware.js";

const router = express.Router();

// Create Product
router.post("/", productValidation.createProductValidation, validate, productController.createProduct);

// Get All Products
router.get("/", productValidation.getProductsValidation, validate, productController.getProducts);

// Get Single Product
router.get("/:id", productValidation.productIdValidation, validate, productController.getProduct);

// Update Product
router.patch("/:id", productValidation.updateProductValidation, validate, productController.updateProduct);

// Delete Product
router.delete("/:id", productValidation.productIdValidation, validate, productController.deleteProduct)

export default router;