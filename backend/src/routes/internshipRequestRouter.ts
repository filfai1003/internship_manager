import { Router } from 'express';
import { createInternshipRequest, listInternshipRequests, resetInternshipRequests, getInternshipRequest, updateInternshipRequestStatus } from '../services/internshipRequestService';

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

router.get('/:id', async (req, res) => {
	const id = Number(req.params.id);
	if (Number.isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });
	try {
		const item = await getInternshipRequest(id);
		res.json(item);
	} catch (err) {
		if (err instanceof Error && err.message === 'Not found') return res.status(404).json({ error: 'Not found' });
		res.status(500).json({ error: (err as Error).message ?? 'Internal error' });
	}
});

router.patch('/:id', async (req, res) => {
	const id = Number(req.params.id);
	if (Number.isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });
	const { status } = req.body ?? {};
	if (typeof status !== 'string') return res.status(400).json({ error: 'Missing or invalid status' });
	try {
		const updated = await updateInternshipRequestStatus(id, status);
		res.json(updated);
	} catch (err) {
		if (err instanceof Error && err.message === 'Not found') return res.status(404).json({ error: 'Not found' });
		if (err instanceof Error && err.message === 'Invalid status') return res.status(400).json({ error: 'Invalid status' });
		res.status(500).json({ error: (err as Error).message ?? 'Internal error' });
	}
});

export default router;
