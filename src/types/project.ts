import mongoose, { Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  createdAt: Date;
  createdBy: mongoose.Types.ObjectId;
}
