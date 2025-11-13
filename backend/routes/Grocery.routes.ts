import express, {RequestHandler} from 'express';
import { authenticateToken } from '../middleware';
import { getGroceryList, addGroceryList, getItems, clickItem } from '../Controller/Grocery.controller';

const router = express.Router();

router.get('/', authenticateToken, getGroceryList);

router.post('/add-list', authenticateToken, addGroceryList);

router.post('/fetch-Items', authenticateToken, getItems);

router.put('/click-Item', authenticateToken, clickItem);

export default router;