import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const SECRET_KEY = process.env.JWT_SECRET as string;

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" });
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as { userId: string };
  } catch (error) {
    return null;
  }
};
