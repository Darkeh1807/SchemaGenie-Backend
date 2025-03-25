import { model, Schema, SchemaTypes } from "mongoose";
import { IUser } from "../types/user";
import { timeStamp } from "console";

const UserSchema = new Schema<IUser>({
  email: {
    type: SchemaTypes.String,
    password: SchemaTypes.String,
  },
});

export const User = model("User", UserSchema);
