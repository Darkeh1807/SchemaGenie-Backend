import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { PasswordService } from "../services/password_service";

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
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await PasswordService.hashPassword(password);

    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "Success", newUser });
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

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      res.status(404).json({ error: "Invalid user credentials" });
      return;
    }

    const passwordMatch = await PasswordService.comparePassword(
      password,
      user.password
    );
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid user credentials" });
      return;
    }

    res.status(200).json({ message: "Success", user });
    return;
  } catch (error) {
    next(error);
  }
};
