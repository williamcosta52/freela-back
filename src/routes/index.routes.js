import { Router } from "express";
import userRouter from "./users.routes.js";
import postRouter from "./posts.routes.js";

const router = Router();

router.use(userRouter);
router.use(postRouter);

export default router;
