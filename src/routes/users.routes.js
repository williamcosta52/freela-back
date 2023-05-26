import { Router } from "express";
import {
	follow,
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
userRouter.post("follow", follow);

export default userRouter;
