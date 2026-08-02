import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

import { addToCartController, getCartController, updateCartController, removeCartItemController, clearCartController } from './cart.controller.js';
import { addCartValidation, updateCartValidation, deleteCartValidation } from './cart.validation.js';

const router = express.Router();

router.post('/', addCartValidation, authMiddleware, addToCartController);
router.get('/', authMiddleware, getCartController);
router.patch('/', updateCartValidation, authMiddleware, updateCartController);
router.delete('/clear', authMiddleware, clearCartController);
router.delete('/:productID', deleteCartValidation, authMiddleware, removeCartItemController);

export default router;