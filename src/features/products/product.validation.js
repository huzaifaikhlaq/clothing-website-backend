import { body, param, query } from "express-validator";

// Create Product Validation

const createProductValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),

    body("sku")
        .trim()
        .notEmpty()
        .withMessage("SKU is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),

    body("salePrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Sale price must be a positive number"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a positive integer"),

    body("gender")
        .isIn(["men", "female"])
        .withMessage("Invalid gender"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

    body("collection")
        .trim()
        .notEmpty()
        .withMessage("Collection is required"),

    body("badge")
        .optional()
        .isIn(["new", "hot", "sale"])
        .withMessage("Invalid badge"),

    body("images")
        .notEmpty()
        .withMessage("imagess is required"),

    body("colors")
        .customSanitizer(value => {
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        })
        .isArray({ min: 1 })
        .withMessage("Select at least one color"),


    body("sizes")
        .customSanitizer(value => {
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        })
        .isArray({ min: 1 })
        .withMessage("Select at least one size"),

    body("isPublished")
        .optional()
        .isBoolean()
        .withMessage("isPublished must be true or false"),
];

// Update Product Validation

const updateProductValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid product ID"),

    body("title")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),

    body("sku")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("SKU cannot be empty"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty"),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),

    body("salePrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Sale price must be a positive number"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a positive integer"),

    body("gender")
        .optional()
        .isIn(["men", "female"])
        .withMessage("Invalid gender"),

    body("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty"),

    body("collection")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Collection cannot be empty"),

    body("badge")
        .optional()
        .isIn(["new", "hot", "sale"])
        .withMessage("Invalid badge"),

    body("images")
        .optional()
        .notEmpty()
        .withMessage("Images cannot be empty"),

    body("colors")
        .optional()
        .customSanitizer(value => {
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        })
        .isArray({ min: 1 })
        .withMessage("Select at least one color"),

    body("sizes")
        .optional()
        .customSanitizer(value => {
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        })
        .isArray({ min: 1 })
        .withMessage("Select at least one size"),

    body("isPublished")
        .optional()
        .isBoolean()
        .withMessage("isPublished must be true or false"),
];

// Product ID Validation

const productIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid product ID"),
];

// Get Products Validation

const getProductsValidation = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be greater than 0"),

    query("limit")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Limit must be greater than 0"),

    query("gender")
        .optional()
        .isIn(["men", "female"])
        .withMessage("Invalid gender"),

    query("badge")
        .optional()
        .isIn(["new", "hot", "sale"])
        .withMessage("Invalid badge"),
];

export default {
    createProductValidation,
    updateProductValidation,
    productIdValidation,
    getProductsValidation,
};