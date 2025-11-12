import express from 'express';
import { authenticateToken } from '../middleware';
import { getGroceryList } from '../Controller/Grocery.controller';

const router = express.Router();

router.get('/',authenticateToken, getGroceryList);

export default router;