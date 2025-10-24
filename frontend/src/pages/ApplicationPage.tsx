import React, { useState } from 'react';
import { Card, message } from 'antd';
import TextForm from '../components/TextForm';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import { createRequest } from '../api/internshipRequest';

const ApplicationPage: FC = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

		const fields = [
			{ name: 'firstName', label: 'First name', placeholder: 'Mario', rules: [{ required: true }] },
			{ name: 'lastName', label: 'Last name', placeholder: 'Rossi', rules: [{ required: true }] },
			{ name: 'email', label: 'Email', placeholder: 'mail@example.com', type: 'email' },
			{ name: 'department', label: 'Department', placeholder: 'Engineering' },
			{ name: 'startDate', label: 'Start date', placeholder: 'YYYY-MM-DD' },
			{ name: 'endDate', label: 'End date', placeholder: 'YYYY-MM-DD' },
			{ name: 'motivation', label: 'Motivation', placeholder: "Why do you want this internship?", type: 'textarea' },
		];

	async function onFinish(values: Record<string, any>) {
		setLoading(true);
		setError(null);
			try {
				await createRequest(values as any);
				message.success('Richiesta creata');
				navigate('/');
				} catch (err: any) {
					setError(err.message || 'Error while creating');
			} finally {
				setLoading(false);
			}
	}

	return (
		<div>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
						<h2>New internship request</h2>
					</div>
					<Card>
						<ErrorMessage visible={!!error} description={error ?? undefined} />
						<TextForm fields={fields as any} onFinish={onFinish} submitText={loading ? 'Saving...' : 'Save'} />
						<div style={{ marginTop: 12 }}>
							<a onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
								Cancel
							</a>
						</div>
					</Card>
		</div>
	);
};

export default ApplicationPage;
