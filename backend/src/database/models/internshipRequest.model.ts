import { PrismaClient } from '@prisma/client';
import { InternshipRequest } from '../../../../shared/types/internshipRequest';

const prisma = new PrismaClient();

export async function createRequest(data: Partial<InternshipRequest> & { lastName: string; firstName: string; email: string; department: string; startDate: string; endDate: string; motivation?: string; }) : Promise<InternshipRequest> {
	const created = await prisma.internshipRequest.create({
		data: {
			lastName: data.lastName,
			firstName: data.firstName,
			email: data.email,
			department: data.department,
			startDate: new Date(data.startDate),
			endDate: new Date(data.endDate),
			motivation: data.motivation,
			status: data.status ?? 'Pending',
		}
	});

	return {
		id: created.id,
		lastName: created.lastName,
		firstName: created.firstName,
		email: created.email,
		department: created.department,
		startDate: created.startDate.toISOString(),
		endDate: created.endDate.toISOString(),
		status: created.status as any,
		motivation: created.motivation ?? undefined,
		createdAt: created.createdAt.toISOString(),
	};
}

export async function listRequests(): Promise<InternshipRequest[]> {
	const rows = await prisma.internshipRequest.findMany({ orderBy: { id: 'asc' } });
	return rows.map(r => ({
		id: r.id,
		lastName: r.lastName,
		firstName: r.firstName,
		email: r.email,
		department: r.department,
		startDate: r.startDate.toISOString(),
		endDate: r.endDate.toISOString(),
		status: r.status as any,
		motivation: r.motivation ?? undefined,
		createdAt: r.createdAt.toISOString(),
	}));
}

// helper for tests or resets
export async function resetStore() {
	await prisma.internshipRequest.deleteMany();
}

