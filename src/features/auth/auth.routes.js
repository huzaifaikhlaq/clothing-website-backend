import express from 'express';
import authController from './auth.controller.js';
import authValidation from './auth.validation.js';

import { rateLimit } from '../../middlewares/rateLimit.middleware.js';

const router = express.Router();

const authRateLimit = rateLimit({
    limit: 5,
    windowSeconds: 60,
    keyPrefix: "rate-limit:auth",
});

router.post('/signup', authValidation.signupValidation , authController.signup);
router.post('/signin', authValidation.signinValidation ,authController.signin);

export default router;