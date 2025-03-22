import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
} from "../controllers/project_controller";

const projectRoutes = Router();

projectRoutes.post("/", createProject);
projectRoutes.get("/", getAllProjects); 
projectRoutes.get("/:projectId", getProjectById); 

export default projectRoutes;
