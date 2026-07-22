import { Router } from 'express';

import authRoutes from "../features/auth/auth.routes.js"
import productRoutes from "../features/products/product.routes.js"
import categoryRoutes from '../features/categories/category.routes.js';
import collectionRouter from '../features/collections/collection.routes.js';


const router = Router()

router.use("/auth", authRoutes)
router.use("/products", productRoutes)
router.use("/categories", categoryRoutes)
router.use("/collections", collectionRouter)

export default router