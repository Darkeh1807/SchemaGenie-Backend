import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(400).json({ error: "User already exists" });

    const newUser = new User({ email, password });

    await newUser.save();
    res.status(201).json({ message: "sucess" });
    return;
  } catch (error) {
    next(error);
  }
};
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      res.status(404).json({ error: "Invalid user credentials" });
      return;
    }

    res.status(200).json({ message: "success", user });
    return;
  } catch (error) {
    next(error);
  }
};
