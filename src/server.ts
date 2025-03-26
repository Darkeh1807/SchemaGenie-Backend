import { Application } from "express";
import { connectDB } from "./db/db_connect";

export const startServer = (app: Application, port: string) => {
  const env = process.env.NODE_ENV;
  connectDB()
    .then(() => {
      app.listen(port, () => {
        if (env === "development")
          console.log(`✅ Server has started running on port ${port} `);
      });
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};
