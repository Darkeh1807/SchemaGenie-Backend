import mongoose, { Schema, SchemaTypes } from "mongoose";
import { IProject } from "../types/project";

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
