import express, { RequestHandler } from 'express';
import { authenticateToken } from '../middleware';
import { getCustomerList, addCustomer, getCredits } from '../Controller/Customer.controller';

const router = express.Router();

router.get('/', authenticateToken, getCustomerList);

router.post('/add-customer', authenticateToken, addCustomer);

router.post('/get-credits', authenticateToken, getCredits);

export default router;