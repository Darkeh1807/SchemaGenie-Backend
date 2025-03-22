import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

export const configureServer = (app: Application) => {
  app.use(cors());
  app.use(compression());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`🛠️  Running in development mode`);
  } else {
    app.use(morgan("combined"));
    console.log("🚀 Running in production mode");
  }
};
