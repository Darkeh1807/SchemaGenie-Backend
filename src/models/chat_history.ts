import mongoose, { Schema, Document } from "mongoose";
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

const MessageSchema = new Schema<Message>({
  role: { type: String, enum: ["user", "model"], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatHistorySchema = new Schema<IChatHistory>({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

export const ChatHistory = mongoose.model<IChatHistory>(
  "ChatHistory",
  ChatHistorySchema
);
