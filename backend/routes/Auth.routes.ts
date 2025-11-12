import express from 'express';
import {pool} from '../database/connection';
import { RegisterUser, LoginUser, CheckUsername, AutoRefresh, LogoutUser } from '../Controller/Auth.controller';

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

router.post('/login', LoginUser);

router.post('/check-user', CheckUsername);

router.post('/refresh', AutoRefresh);

router.post('/logout', LogoutUser)

export default router;