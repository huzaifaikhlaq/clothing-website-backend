import express from "express";

import productController from "./product.controller.js";
import productValidation from "./product.validation.js";

const router = express.Router();

// Create Product
router.post("/", productValidation.createProductValidation,  productController.createProduct);

// Get All Products
router.get("/", productValidation.getProductsValidation,  productController.getProducts);

// Get Single Product
router.get("/:id", productValidation.productIdValidation,  productController.getProduct);

// Update Product
router.patch("/:id", productValidation.updateProductValidation,  productController.updateProduct);

// Delete Product
router.delete("/:id", productValidation.productIdValidation,  productController.deleteProduct)

export default router;