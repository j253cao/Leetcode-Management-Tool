import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";

dotenv.config();

export const verifyUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(404).json({ message: "Incorrect email or password." });
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) return res.status(400).json({ message: "Incorrect email or password." });
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    return res.status(200).json({ result: user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const existingUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(404).json({ message: "Incorrect email or password." });
    const correctPassword = password === user.password;
    if (!correctPassword) return res.status(400).json({ message: "Incorrect email or password." });
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    return res.status(200).json({ result: user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const postUserSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const fetchUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
