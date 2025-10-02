import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response } from 'express';
import AuthRouter from './routes/authRoutes';
import SchoolRouter from './routes/schoolRoutes';
import ClassRouter from './routes/classRoutes';
import EmployeeRouter from './routes/employeeRoutes';
import subjectRouter from './routes/subjectRoutes';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use(morgan('tiny'));

app.use(express.json());
app.use('/api/auth', AuthRouter);
app.use('/api/school', SchoolRouter);
app.use('/api/class', ClassRouter);
app.use('/api/employee', EmployeeRouter);
app.use('/api/subject', subjectRouter)


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