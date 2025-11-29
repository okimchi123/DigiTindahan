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

const getCredits = async (req: Request, res: Response) => {
  try {
    const { customer_id } = req.body;

    const [rows]: any = await pool.query(
      "SELECT * FROM product_credit WHERE customer_id = ?",
      [customer_id]
    );

    const formattedItems = rows.map((item: any) => ({
      ...item,
      is_paid: Boolean(item.is_paid),
    }));
    res.status(200).json(formattedItems);
  } catch (error) {
    res.status(500).json({ message: "Fetch item error" });
  }
};

const AddCredit = async (req: Request, res: Response) => {
  try {
    const { customer_id, product_name, product_quantity, product_type, price } = req.body;

    await pool.query("INSERT INTO product_credit (customer_id, product_name, product_quantity, product_type, price) values (?, ?, ?, ?, ?)",[customer_id, product_name, product_quantity, product_type, price]);
  
    res.status(200).json({customer_id});
  } catch (error) {
    res.status(500).json({ message: "Fetch item error" });
  }
};

export {getCustomerList, addCustomer, getCredits, AddCredit};