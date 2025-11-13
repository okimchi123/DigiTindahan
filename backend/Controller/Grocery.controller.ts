import { pool } from "../database/connection";
import type { Response, Request } from "express";

const getGroceryList = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const [rows] = await pool.query(
      "SELECT * FROM grocery_list WHERE user_id = ?",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addGroceryList = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const list_name = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

   const [result]:any = await pool.query("INSERT INTO grocery_list (user_id, list_name) VALUES (?, ?)",[userId, list_name])
   const list_id = result.insertId; 
   res.status(200).json({ list_id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    const { list_id } = req.body;
    const [rows]: any = await pool.query(
      "SELECT * FROM todo_item WHERE list_id = ?",
      [list_id]
    );

    const formattedItems = rows.map((item: any) => ({
      ...item,
      is_completed: Boolean(item.is_completed),
    }));
    res.status(200).json(formattedItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const clickItem = async (req: Request, res: Response) => {
  try {
    const { value, item_id, list_id } = req.body;

    await pool.query(
      "UPDATE todo_item SET is_completed = ? WHERE item_id = ? AND list_id = ?",
      [value, item_id, list_id]
    );
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getGroceryList, addGroceryList, getItems, clickItem };
