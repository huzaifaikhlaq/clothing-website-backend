import { Router } from 'express';

import authRoutes from "../features/auth/auth.routes.js"
import productRoutes from "../features/products/product.routes.js"
import categoryRoutes from '../features/categories/category.routes.js';
import collectionRouter from '../features/collections/collection.routes.js';
import CartRouter from '../features/cart/cart.routes.js';
import orderRoutes from '../features/orders/order.routes.js';
import userRoutes from '../features/users/user.routes.js';

// middleware
import adminMiddleware from '../middlewares/admin.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';


const router = Router()

router.use("/auth", authRoutes)
router.use("/products", productRoutes)
router.use("/categories", categoryRoutes)
router.use("/collections", collectionRouter)
router.use("/cart", CartRouter)
router.use("/orders", orderRoutes)
router.use("/users", authMiddleware, adminMiddleware, userRoutes)

export default router