import { pool } from "../database/connection";
import type { Response, Request } from "express";

const getCustomerList = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const [rows] = await pool.query(
      "SELECT * FROM customer_credit WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {getCustomerList};