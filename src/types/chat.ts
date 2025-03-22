import mongoose from "mongoose";
import { IProject } from "./project";

export interface Message {
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface IChatHistory extends Document {
  projectId: mongoose.Types.ObjectId | IProject;

  messages: Message[];
  createdAt: Date;
}
