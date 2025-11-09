import express from 'express';
import pool from '../database/connection';
import { RegisterUser } from '../Controller/Auth.controller';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * from user");
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: error });
    }
});

router.post('/register', RegisterUser);
export default router;