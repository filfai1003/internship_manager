import { Router } from 'express';
import internshipRequestRouter from '../routes/internshipRequestRouter';

const router = Router();

router.use('/internship-requests', internshipRequestRouter);

export default router;
