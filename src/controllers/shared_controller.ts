import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { Shared } from "../models/shared";
import { Project } from "../models/project";

export const shareProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { from, to, projectId } = req.body;
    if (!from || !to || !projectId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    from = from.trim().toLowerCase();
    to = to.trim().toLowerCase();

    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    // console.log(from);
    // console.log(project.createdBy.toString());

    // console.log(project.createdBy !== from);

    if (project.createdBy.toString() !== from) {
      res
        .status(403)
        .json({ error: "You do not have permission to share this project" });
      return;
    }

    const alreadyShared = await Shared.findOne({ from, to, projectId });
    if (alreadyShared) {
      res
        .status(409)
        .json({ error: "Project has already been shared to the user" });
      return;
    }

    const newSharedProject = await Shared.create({ from, to, projectId });
    res.status(201).json({ message: "Success", project: newSharedProject });
    return;
  } catch (error) {
    next(error);
  }
};

export const getUserSharedProjects = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ error: "userId is required" });
    return;
  }




};
