import jwt from "jsonwebtoken";
import { User } from "./types";
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "my_little_secret";

export const createToken = ({ userId, username }: User) => {
  return jwt.sign(
    {
      userId,
      username,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const getUserByToken = (token: string): User => {
  try {
    const decoded: unknown = jwt.verify(token, JWT_SECRET);

    return decoded as User;
  } catch (err) {
    console.log("Error occured while verifying token", err);
    throw new Error("Invalid token");
  }
};
