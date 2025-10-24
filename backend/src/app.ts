import express from 'express';
import apiRouter from './api/router';

const app = express();

app.use(express.json());

// health
app.get('/', (req, res) => res.json({ status: 'ok' }));

// API router mounted at /api
app.use('/api', apiRouter);

export default app;
