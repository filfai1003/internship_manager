import { Router } from 'express';
import { createInternshipRequest, listInternshipRequests, resetInternshipRequests } from '../services/internshipRequestService';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const items = await listInternshipRequests();
		res.json(items);
	} catch (err) {
		res.status(500).json({ error: (err as Error).message ?? 'Internal error' });
	}
});

router.post('/', async (req, res) => {
	try {
		const created = await createInternshipRequest(req.body);
		res.status(201).json(created);
	} catch (err) {
		if (err instanceof Error && err.message.startsWith('Missing field:')) {
            return res.status(400).json({ error: err.message });
        }
        if (err instanceof Error && err.message.startsWith('Invalid email')) {
            return res.status(400).json({ error: err.message });
        }
        if (err instanceof Error && err.message.startsWith('Invalid date')) {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: (err as Error).message ?? 'Internal error' });
	}
});

router.delete('/', async (req, res) => {
	try {
		await resetInternshipRequests();
		res.status(204).send();
	} catch (err) {
		res.status(500).json({ error: (err as Error).message ?? 'Internal error' });
	}
});

export default router;
