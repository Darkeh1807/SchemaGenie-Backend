import { model, Schema, SchemaTypes } from "mongoose";
import { ISharedSchema } from "../types/shared";

const SharedSchema = new Schema<ISharedSchema>({
  from: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  projectId: {
    type: SchemaTypes.ObjectId,
    ref: "Project",
    required: true,
  },
});

export const Shared = model("Shared", SharedSchema);
