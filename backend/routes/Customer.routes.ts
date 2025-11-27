import express, { RequestHandler } from 'express';
import { authenticateToken } from '../middleware';
import { getCustomerList } from '../Controller/Customer.controller';

const router = express.Router();

router.get('/', authenticateToken, getCustomerList);

export default router;