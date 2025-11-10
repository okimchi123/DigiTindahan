import {pool, useUsername} from "../database/connection";
import bcrypt from "bcryptjs";
import generateTokens from "../Auth/CreateToken";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { username, passcode } = req.body;

    const rows: any = await useUsername(username);

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

const CheckUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const rows: any = await useUsername(username);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Username does not exist' });
    }

    res.status(200).json({message: 'Username is valid'});
  } catch (error) {
    
  }
};

const LoginUser = async (req: Request, res: Response) => {
  try {
    const { username, passcode } = req.body;
    const rows: any = await useUsername(username);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid username or passcode' });
    }

    const user = rows[0];

    const isValidPasscode = await bcrypt.compare(passcode, user.passcode);

    if (!isValidPasscode) {
      return res.status(400).json({ message: 'Invalid username or passcode' });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 365 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      accessToken,
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const AutoRefresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403);

    const {accessToken} = generateTokens(decoded.userId);

    res.json({ accessToken });
  });
}

const LogoutUser = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
}

export { RegisterUser, LoginUser, CheckUsername, AutoRefresh, LogoutUser };
