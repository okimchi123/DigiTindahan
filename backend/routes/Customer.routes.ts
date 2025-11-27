import express, { RequestHandler } from 'express';
import { authenticateToken } from '../middleware';
import { getCustomerList, addCustomer } from '../Controller/Customer.controller';

const router = express.Router();

router.get('/', authenticateToken, getCustomerList);

router.post('/add-customer', authenticateToken, addCustomer);

export default router;