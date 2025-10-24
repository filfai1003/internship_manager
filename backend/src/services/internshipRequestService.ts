import { createRequest, listRequests, resetStore } from '../database/models/internshipRequest.model';
import { InternshipRequest } from '../../../shared/types/internshipRequest';
import { isValidEmail, isValidISODate } from '../utils/validator';
import { compareDates } from '../utils/dateTools';


export async function createInternshipRequest(payload: any): Promise<InternshipRequest> {
	// basic required field validation
	const required = ['lastName', 'firstName', 'email', 'department', 'startDate', 'endDate'];
	for (const f of required) {
		if (!payload || typeof payload[f] === 'undefined' || payload[f] === null || payload[f] === '') {
			throw new Error(`Missing field: ${f}`);
		}
	}

	// email check
	if (!isValidEmail(payload.email)) {
		throw new Error('Invalid email');
	}

	// date check
	if (!isValidISODate(payload.startDate)) {
        throw new Error('Invalid date format for startDate');
    }
    if (!isValidISODate(payload.endDate)) {
        throw new Error('Invalid date format for endDate');
    }

	// startDate must be before endDate
	if (compareDates(payload.startDate, payload.endDate) !== -1) {
		throw new Error('startDate must be before endDate');
	}

	// create and return the record
	const record = await createRequest(payload);
	return record;
}

export async function listInternshipRequests(): Promise<InternshipRequest[]> {
	return await listRequests();
}

export async function resetInternshipRequests(): Promise<void> {
	return await resetStore();
}
