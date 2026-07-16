const { body } = require('express-validator');

exports.updateProfileValidation = [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
];
