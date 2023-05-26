import { Router } from "express";
import {
	followers,
	following,
	infosUser,
	signIn,
	signUp,
} from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { signInSchema, signUpSchema } from "../schemas/user.schema.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(signUpSchema), signUp);
userRouter.post("/signin", validateSchema(signInSchema), signIn);
userRouter.get("/infos", infosUser);
userRouter.post("/following", following);
userRouter.get("/followers", followers);

export default userRouter;
