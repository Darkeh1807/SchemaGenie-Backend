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
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await PasswordService.hashPassword(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

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

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const passwordMatch = await PasswordService.comparePassword(
      password,
      user.password
    );

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" }); // ✅ Keep response consistent
      return;
    }

    res.status(200).json({ message: "Success", user });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllAppUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    let users;
    let count;

    users = await User.find();

    users = users.filter((user) => user.id !== userId);
    count = users.length;
    res.status(200).json({ message: "Success", users, count });
    return;
  } catch (error) {
    next(error);
  }
};
