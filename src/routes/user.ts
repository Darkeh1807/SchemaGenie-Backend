import { Router } from "express";
import { getAllAppUsers, signIn, signUp } from "../controllers/user_controller";

export const userRouter = Router();

userRouter.post("/signin", signIn);
userRouter.post("/signup", signUp);
userRouter.get("/:userId", getAllAppUsers);
