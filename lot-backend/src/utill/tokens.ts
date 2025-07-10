import jwt from "jsonwebtoken";

// functions for generating and managing tokens
const SECRET_KEY = "sicbvsib48fgff";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" });
};

export const verifyToken = (token: string): { userId: number } | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as { userId: number };
  } catch (error) {
    return null;
  }
};
