import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response } from 'express';
import AuthRouter from './routes/authRoutes';
import SchoolRouter from './routes/schoolRoutes';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use(express.json());
app.use('/api', AuthRouter);
app.use('/api', SchoolRouter);
const port = process.env.PORT || 3000;
const host = process.env.HOST;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toLocaleString()
  });
});

app.listen(port, () => {
  console.log(`server is running at http://${host}:${port}`);
});