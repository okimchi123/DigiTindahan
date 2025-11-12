import {pool} from "../database/connection";
import { AuthRequest } from "../middleware";
import type { Response } from "express";

const getGroceryList = async (req: AuthRequest, res: Response) => {
    try {
    const userId = req.userId;
    const [rows] = await pool.query(
      "SELECT * FROM grocery_list WHERE user_id = ?",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export {getGroceryList};