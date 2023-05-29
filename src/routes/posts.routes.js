import { Router } from "express";
import {
	like,
	postComment,
	publiPost,
} from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/post", publiPost);
postRouter.post("/post/:idPost", postComment);
postRouter.post("/like/:id", like);

export default postRouter;
