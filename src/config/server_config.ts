import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

const allowedOrigins = [
  "https://schemagenie.vercel.app",
  "http://localhost:5173",
];

export const configureServer = (app: Application) => {
  app.use(
    cors({
      origin: allowedOrigins,
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );
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
