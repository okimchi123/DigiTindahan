import pool from "../database/connection";
import bcrypt from "bcryptjs";
import generateTokens from "../Auth/CreateToken";
import type { Request, Response } from "express";

const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { username, passcode } = req.body;

    const [rows]: any = await pool.query(
      "SELECT 1 FROM user WHERE username = ? LIMIT 1",
      [username]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPasscode = await bcrypt.hash(passcode, 10);

    const [result]: any = await pool.query(
      "INSERT INTO user (username, passcode) VALUES (?, ?)",
      [username, hashedPasscode]
    );

    const userId = result.insertId;

    const { accessToken, refreshToken } = generateTokens(userId);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      user: {
        id: userId,
        username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { RegisterUser };
