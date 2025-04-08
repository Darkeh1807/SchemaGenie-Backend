import { NextFunction, Request, Response } from "express";
import { Project } from "../models/project";
import { ChatHistory } from "../models/chat_history";
import { ChatWithAI } from "../services/aiService";
import { Message } from "../types/chat";

interface History {
  role: "user" | "model";
  parts: { text: string }[];
}

export const saveChatMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId, text, sentBy } = req.body;

    if (!projectId || !text || !sentBy) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    let chat = await ChatHistory.findOne({ projectId });

    let history: History[] = [];

    if (chat) {
      history = chat.messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));
    }

    const aiResponse = await ChatWithAI(text, history);
    const now = new Date();
    const newMessages: Message[] = [
      {
        role: "user" as "user",
        sentBy,
        text,
        timestamp: now,
      },
      {
        role: "model" as "model",
        text: aiResponse,
        timestamp: now,
      },
    ];

    if (chat) {
      chat.messages.push(...newMessages);
      await chat.save();
    } else {
      chat = await ChatHistory.create({
        projectId,
        messages: newMessages,
      });
    }

    res.status(201).json({ message: "Chat saved successfully", chat });
  } catch (error) {
    next(error);
  }
};

export const getChatHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      res.status(400).json({ error: "Project ID is required" });
      return;
    }

    const chat = await ChatHistory.findOne({ projectId })
      .populate("projectId", "title")
      .populate("messages.sentBy");

    res.status(200).json({ chat });
    return;
  } catch (error) {
    next(error);
  }
};
