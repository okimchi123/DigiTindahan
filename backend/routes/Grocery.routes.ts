import express, {RequestHandler} from 'express';
import { authenticateToken } from '../middleware';
import { getGroceryList, addGroceryList, getItems, clickItem, AddItem, deleteLists } from '../Controller/Grocery.controller';

const router = express.Router();

router.get('/', authenticateToken, getGroceryList);

router.post('/add-list', authenticateToken, addGroceryList);

router.post('/fetch-items', authenticateToken, getItems);

router.put('/click-item', authenticateToken, clickItem);

router.post('/add-item', authenticateToken, AddItem);

router.delete('/delete-lists', authenticateToken, deleteLists);

export default router;