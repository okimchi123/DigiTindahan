import { pool } from "../database/connection";
import type { Response, Request } from "express";

const getGroceryList = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const [rows] = await pool.query(
      "SELECT * FROM grocery_list WHERE user_id = ? ORDER BY created_at DESC",
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

    const [result]: any = await pool.query(
      "INSERT INTO grocery_list (user_id, list_name) VALUES (?, ?)",
      [userId, list_name]
    );
    const list_id = result.insertId;
    res.status(200).json({ list_id });
  } catch (error) {
    res.status(500).json({ message: "Adding of list error" });
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
    res.status(500).json({ message: "Fetch item error" });
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
    res.status(500).json({ message: "Update of item error" });
  }
};

const AddItem = async (req: Request, res: Response) => {
  try {
    const { list_id, product_name, product_quantity } = req.body;

    await pool.query(
      "INSERT INTO todo_item (list_id, product_name, product_quantity) VALUES ( ?, ?, ?)",
      [list_id, product_name, product_quantity]
    );
    await pool.query(
      "update grocery_list set latest_item = ?, latest_item_quantity = ? where list_id = ?",
      [product_name, product_quantity, list_id]
    );

    res.status(200).json({ message: "created item successfully" });
  } catch (error) {
    res.status(500).json({ message: "Creation of item error" });
  }
};

const deleteLists = async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (ids.length === 0) {
    return res.status(400).json({ error: "No IDs provided" });
  }

  try {
    const placeholders = ids.map(() => "?").join(",");
    const query = `DELETE FROM grocery_list WHERE list_id IN (${placeholders})`;

    await pool.execute(query, ids);

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion Error" });
  }
};

const deleteItems = async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (ids.length === 0) {
    return res.status(400).json({ error: "No IDs provided" });
  }

  try {
    const placeholders = ids.map(() => "?").join(",");
    const query = `DELETE FROM todo_item WHERE item_id IN (${placeholders})`;

    await pool.execute(query, ids);

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion Error" });
  }
};

const finishedLists = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const [rows] = await pool.query(
      `SELECT gl.list_id
      FROM grocery_list gl
      WHERE gl.user_id = ?
      AND EXISTS (
      SELECT 1
      FROM todo_item ti
      WHERE ti.list_id = gl.list_id
      )
        AND NOT EXISTS (
        SELECT 1
        FROM todo_item ti
        WHERE ti.list_id = gl.list_id
        AND ti.is_completed = 0
      )`,
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching finished lists" });
  }
};

export {
  getGroceryList,
  addGroceryList,
  getItems,
  clickItem,
  AddItem,
  deleteLists,
  deleteItems,
  finishedLists,
};
