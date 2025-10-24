import express from 'express';
import cors from 'cors';
import internshipRequestRouter from './routes/internshipRequestRouter';

const app = express();

app.use(cors());

app.use(express.json());

// health
app.get('/', (req, res) => res.json({ status: 'ok' }));

// API router mounted at /api
app.use('/internship-requests', internshipRequestRouter);

export default app;
