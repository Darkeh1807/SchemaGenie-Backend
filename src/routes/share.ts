import { Router } from "express";
import { shareProject } from "../controllers/shared_controller";

export const shareRouter = Router();

shareRouter.post("/", shareProject);
