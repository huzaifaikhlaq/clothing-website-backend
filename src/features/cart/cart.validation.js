import { body, param } from "express-validator";

export const addCartValidation = [
    body("product").notEmpty().withMessage("Product ID is required").isMongoId().withMessage("Invalid product ID"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("size").isString().withMessage("Size is required"),
    body("color").isString().withMessage("Color is required"),
]

export const updateCartValidation = [
    body("product").notEmpty().withMessage("Product ID is required").isMongoId().withMessage("Invalid product ID"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("size").optional().isString().withMessage("Size is required"),
    body("color").optional().isString().withMessage("Color is required"),
]

export const deleteCartValidation = [
    param("productID").isMongoId().withMessage("Invalid cart ID"),
]
