import mongoose, { Schema, SchemaTypes } from "mongoose";
import { IChatHistory, Message } from "../types/chat";

const MessageSchema = new Schema<Message>({
  role: {
    type: SchemaTypes.String,
    enum: ["user", "model"],
    required: true,
  },
  sentBy: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: function () {
      return this.role === "user";
    },
  },
  text: {
    type: SchemaTypes.String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const ChatHistorySchema = new Schema<IChatHistory>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  messages: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ChatHistory = mongoose.model<IChatHistory>(
  "ChatHistory",
  ChatHistorySchema
);
