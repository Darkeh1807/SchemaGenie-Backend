import { Router } from "express";
import { signIn, signUp } from "../controllers/user_controller";

export const userRouter = Router();

userRouter.post("/signin", signIn);
userRouter.post("/signup", signUp);
