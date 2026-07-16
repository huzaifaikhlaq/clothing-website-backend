const express = require('express');
const uploadController = require('./upload.controller');

const router = express.Router();

router.post('/', uploadController.uploadFile);

module.exports = router;
