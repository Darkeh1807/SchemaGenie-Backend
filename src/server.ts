import { Application } from "express";
import { connectDB } from "./db/db_connect";

export const startServer = (app: Application, port: string) => {
  connectDB();
  app.listen(port, () => {
    console.log(`✅ Server has started running on port ${port} `);
  });
};
