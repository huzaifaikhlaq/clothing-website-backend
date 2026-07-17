import { Router } from 'express';

import authRoutes from "../features/auth/auth.routes.js"
import productRoutes from "../features/products/product.routes.js"


const router = Router()

router.use("/auth", authRoutes)
router.use("/products", productRoutes)

export default router