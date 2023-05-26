import { Router } from "express";
import { postComment, publiPost } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/post", publiPost);
postRouter.post("/post/:idPost", postComment);

export default postRouter;
