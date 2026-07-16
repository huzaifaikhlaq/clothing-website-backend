const { body } = require('express-validator');

exports.createCategoryValidation = [
    body('name').notEmpty().withMessage('Category name is required'),
    body('slug').notEmpty().withMessage('Category slug is required'),
];
