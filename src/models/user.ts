import { model, Schema, SchemaTypes } from "mongoose";
import { IUser } from "../types/user";
import { timeStamp } from "console";

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
  },
});

export const User = model("User", UserSchema);
