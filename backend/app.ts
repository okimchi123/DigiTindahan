import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/auth.route';
import cors from 'cors';

const app = express();

dotenv.config();

app.use(cors({
    origin: process.env.ORIGIN,
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json("from backend");
});

app.use('/user', AuthRoutes);

app.listen(process.env.PORT, () =>console.log(`Server is active!`));