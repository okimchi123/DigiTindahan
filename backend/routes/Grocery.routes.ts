import express, {RequestHandler} from 'express';
import { authenticateToken } from '../middleware';
import { getGroceryList, addGroceryList, getItems, clickItem, AddItem } from '../Controller/Grocery.controller';

const router = express.Router();

router.get('/', authenticateToken, getGroceryList);

router.post('/add-list', authenticateToken, addGroceryList);

router.post('/fetch-items', authenticateToken, getItems);

router.put('/click-item', authenticateToken, clickItem);

router.post('/add-item', authenticateToken, AddItem)

export default router;