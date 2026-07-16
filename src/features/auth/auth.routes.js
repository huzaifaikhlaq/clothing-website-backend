import express from 'express';
import authController from './auth.controller.js';
import authValidation from './auth.validation.js';

const router = express.Router();

router.post('/signup', authValidation.signupValidation , authController.signup);
router.post('/signin', authValidation.signinValidation ,authController.signin);

export default router;