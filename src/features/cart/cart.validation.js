const { body } = require('express-validator');

exports.addToCartValidation = [
    body('product').notEmpty().withMessage('Product is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];
