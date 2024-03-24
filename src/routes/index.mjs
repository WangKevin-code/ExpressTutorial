import { Router } from 'express'
import userRouter from "../routes/user.mjs"
import productRouter from "../routes/products.mjs"

const router = Router();
router.use(userRouter);
router.use(productRouter);

export default router;