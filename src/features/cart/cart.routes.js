import express from 'express';
import { requireAuth } from '../../middlewares/auth.middleware.js';

import { addToCartController, getCartController, updateCartController, removeCartItemController, clearCartController } from './cart.controller.js';
import { addCartValidation, updateCartValidation, deleteCartValidation } from './cart.validation.js';

const router = express.Router();

router.post('/', addCartValidation, requireAuth, addToCartController);
router.get('/', requireAuth, getCartController);
router.patch('/', updateCartValidation, requireAuth, updateCartController);
router.delete('/:productID', deleteCartValidation, requireAuth, removeCartItemController);
router.delete('/clear', requireAuth, clearCartController);

export default router;