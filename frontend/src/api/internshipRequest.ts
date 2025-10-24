const BACKEND = 'http://localhost:3000';


import { InternshipRequest } from '@internship/shared';

export type InternshipRequestInput = {
  firstName: string;
  lastName: string;
  email?: string;
  department?: string;
  startDate?: string;
  endDate?: string;
  motivation?: string;
};

export async function listRequests(): Promise<InternshipRequest[]> {
  const res = await fetch(`${BACKEND}/internship-requests`);
  if (!res.ok) {
    const txt = await res.text().catch(() => res.statusText || 'Error');
    throw new Error(txt || `Server returned ${res.status}`);
  }
  return res.json();
}

export async function getRequestById(id: number): Promise<InternshipRequest | null> {
  const res = await fetch(`${BACKEND}/internship-requests/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    const txt = await res.text().catch(() => res.statusText || 'Error');
    throw new Error(txt || `Server returned ${res.status}`);
  }
  return res.json();
}

export async function createRequest(payload: InternshipRequestInput): Promise<InternshipRequest> {
  const res = await fetch(`${BACKEND}/internship-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => res.statusText || 'Error');
    throw new Error(txt || `Server returned ${res.status}`);
  }
  return res.json();
}

export async function updateRequestStatus(id: number, status: string): Promise<InternshipRequest> {
  const res = await fetch(`${BACKEND}/internship-requests/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => res.statusText || 'Error');
    throw new Error(txt || `Server returned ${res.status}`);
  }
  return res.json();
}

export default {
  listRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
};
