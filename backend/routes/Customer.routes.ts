import express, { RequestHandler } from 'express';
import { authenticateToken } from '../middleware';
import { getCustomerList, addCustomer, getCredits, AddCredit } from '../Controller/Customer.controller';

const router = express.Router();

router.get('/', authenticateToken, getCustomerList);

router.post('/add-customer', authenticateToken, addCustomer);

router.post('/get-credits', authenticateToken, getCredits);

router.post('/add-credit', authenticateToken, AddCredit);

export default router;