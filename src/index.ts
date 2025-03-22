import express, { Request, Response } from "express";
import { startServer } from "./server";
import { configDotenv } from "dotenv";
import { configureServer } from "./config/server_config";
import { errorHandler } from "./middlewares/error_handler";
import chatRouter from "./routes/chat";
import projectRoutes from "./routes/project";
configDotenv();
const app = express();
const PORT = process.env.PORT as string | 5000;

configureServer(app);

app.use(errorHandler);
app.use("/api/chats", chatRouter);
app.use("/api/projects", projectRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello schema genie");
});

startServer(app, PORT as string);
