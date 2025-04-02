import mongoose from "mongoose";

export interface ISharedSchema {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
}
