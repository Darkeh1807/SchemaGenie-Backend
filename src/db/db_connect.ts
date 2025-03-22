import { configDotenv } from "dotenv";
import { connect } from "mongoose";
configDotenv();

const dbUrl: string = process.env.DB_URL as string;

export const connectDB = () => {
  connect(dbUrl)
    .then(() => {
      if (process.env.NODE_ENV === "development") {
        console.log(`🔥 Database Connected succesfully`);
      }
    })
    .catch((e: Error) => {
      console.log(e.message);
    });
};
