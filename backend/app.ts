import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/auth.route';

const app = express();

dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
  res.json("from backend");
});

app.use('/user', AuthRoutes);

app.listen(process.env.PORT, () =>console.log(`Server is active!`));