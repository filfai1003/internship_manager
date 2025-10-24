// Shared types for an internship request used by frontend and backend

export enum InternshipStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export interface InternshipRequest {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  department: string;
  startDate: string; // use ISO date strings ("YYYY-MM-DD")
  endDate: string;
  status: InternshipStatus;
  motivation?: string;
  createdAt: string;
}

export function makeInternshipRequest(partial: Partial<InternshipRequest> & { id: number; lastName: string; firstName: string; email: string; department: string; startDate: string; endDate: string; }): InternshipRequest {
  const now = new Date().toISOString();
  return {
    id: partial.id,
    lastName: partial.lastName,
    firstName: partial.firstName,
    email: partial.email,
    department: partial.department,
    startDate: partial.startDate,
    endDate: partial.endDate,
    status: partial.status ?? InternshipStatus.Pending,
    motivation: partial.motivation,
    createdAt: partial.createdAt ?? now,
  };
}
