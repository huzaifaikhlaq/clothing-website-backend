const { body } = require('express-validator');

exports.createOrderValidation = [
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be greater than 0'),
];
