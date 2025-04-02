import { Router } from "express";
import {
  getUserSharedProjects,
  shareProject,
} from "../controllers/shared_controller";

export const shareRouter = Router();

shareRouter.post("/", shareProject);
shareRouter.get("/:userId", getUserSharedProjects);
