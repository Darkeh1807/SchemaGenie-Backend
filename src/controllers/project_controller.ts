import { NextFunction, Request, Response } from "express";
import { Project } from "../models/project";

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      res.status(400).json({ error: "Project title already exists" });
      return;
    }

    const project = await Project.create({ title });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    next(error);
  }
};

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
    return;
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.status(200).json({ project });
  } catch (error) {
    next(error);
  }
};
