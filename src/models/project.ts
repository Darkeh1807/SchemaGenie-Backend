import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
