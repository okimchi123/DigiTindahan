import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/Auth.routes'
import GroceryRoutes from './routes/Grocery.routes'
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

app.use(cors({
    origin: process.env.ORIGIN,
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json("from backend");
});

app.use('/user', AuthRoutes);
app.use('/grocery', GroceryRoutes);

app.listen(process.env.PORT, () =>console.log(`Server is active!`));