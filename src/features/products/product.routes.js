import express from "express";

import productController from "./product.controller.js";
import productValidation from "./product.validation.js";

import { cacheResponse } from "../../middlewares/cache.middleware.js";

const router = express.Router();

// Create Product
router.post("/", productValidation.createProductValidation, productController.createProduct);

// Get All Products
router.get("/", cacheResponse({ ttl: 60, keyPrefix: "products:list", }), , productValidation.getProductsValidation, productController.getProducts);

// Get Single Product
router.get("/:id", cacheResponse({ ttl: 300, keyPrefix: "products:item", }), , productValidation.productIdValidation, productController.getProduct);

// Update Product
router.patch("/:id", productValidation.updateProductValidation, productController.updateProduct);

// Delete Product
router.delete("/:id", productValidation.productIdValidation, productController.deleteProduct)

export default router;