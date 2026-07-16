const express = require('express');
const cartController = require('./cart.controller');

const router = express.Router();

router.get('/', cartController.getCart);

module.exports = router;
