import { Router } from "express";
import {
  createProject,
  getAllProjectsByUser,
  getProjectById,
} from "../controllers/project_controller";

const projectRoutes = Router();

projectRoutes.post("/", createProject);
projectRoutes.get("/:userId", getAllProjectsByUser); 
projectRoutes.get("/:projectId", getProjectById); 

export default projectRoutes;
