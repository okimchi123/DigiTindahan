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
    res.status(500).json({ message: "Fetching customer list error" });
  }
};

const addCustomer = async (req: Request, res: Response) => {
    try {
     const {customer_name} = req.body;
     const userId = req.user?.userId;

    await pool.query("INSERT INTO customer_credit (user_id, customer_name) values (?, ?)",[userId, customer_name]);

    res.status(200).json({message:`Added ${customer_name} successfully`});
    } catch (error) {
    res.status(500).json({ message: "Error in adding customer" });
    }
}

export {getCustomerList, addCustomer};