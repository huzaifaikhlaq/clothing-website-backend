import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { guestCartMiddleware } from '../../middlewares/guestCart.middleware.js';
import { optionalAuthMiddleware } from '../../middlewares/optionalAuth.middleware.js';

import { addToCartController, getCartController, updateCartController, removeCartItemController, clearCartController, mergeGuestCartController } from './cart.controller.js';
import { addCartValidation, updateCartValidation, deleteCartValidation } from './cart.validation.js';

const router = express.Router();

const cartMiddleware = [
    optionalAuthMiddleware,
    guestCartMiddleware
];

router.post('/', addCartValidation, ...cartMiddleware, addToCartController);
router.get('/', ...cartMiddleware, getCartController);
router.patch('/', updateCartValidation, ...cartMiddleware, updateCartController);
router.delete('/clear', ...cartMiddleware, clearCartController);
router.delete('/:productID', deleteCartValidation, ...cartMiddleware, removeCartItemController);

// Merge CartGuest
router.post("/merge", guestCartMiddleware, authMiddleware, mergeGuestCartController)

export default router;