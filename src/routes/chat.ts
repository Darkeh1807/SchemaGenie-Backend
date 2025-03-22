import express from "express";
import { getChatHistory, saveChatMessage } from "../controllers/chat_controller";

const chatRouter = express.Router();

chatRouter.post("/", saveChatMessage);
chatRouter.get("/:projectId", getChatHistory);

export default chatRouter;
