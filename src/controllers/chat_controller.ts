import { Request, Response } from "express";
import { Project } from "../models/project";
import { ChatHistory } from "../models/chat_history";
import { ChatWithAI } from "../services/aiService";

export const saveChatMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { projectId, text } = req.body;

    if (!projectId || !text) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    let chat = await ChatHistory.findOne({ projectId });

    let history: { role: "user" | "model"; parts: { text: string }[] }[] = [];

    if (chat) {
      history = chat.messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));
    }

    const aiResponse = await ChatWithAI(text, history);

    const newMessages = [
      { role: "user" as "user", text, timestamp: new Date() },
      { role: "model" as "model", text: aiResponse, timestamp: new Date() },
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
    console.error("Error saving chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChatHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      res.status(400).json({ error: "Project ID is required" });
      return;
    }

    const chat = await ChatHistory.findOne({ projectId }).populate(
      "projectId",
      "title"
    );

    res.status(200).json({ chat });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
