
import { useEffect, useState } from 'react';
import { Card, Descriptions, Spin, Button, Space, message } from 'antd';
import { formatDate } from '../utils/formatDate';
import { useParams, useNavigate } from 'react-router-dom';
import type { FC } from 'react';

const BACKEND = 'http://localhost:3000/api';

const DetailPage: FC = () => {
	const params = useParams();
	const navigate = useNavigate();
	const id = params.id ? Number(params.id) : NaN;
		const [item, setItem] = useState<any | null>(null);
	const [loading, setLoading] = useState(false);
		const [actionLoading, setActionLoading] = useState(false);

		useEffect(() => {
		if (!id || Number.isNaN(id)) {
			setItem(null);
			return;
		}
		let mounted = true;
			async function load() {
				setLoading(true);
				try {
					const { getRequestById } = await import('../api/internshipRequest');
					const data = await getRequestById(id);
					if (mounted) setItem(data);
				} catch (err) {
					if (mounted) setItem(null);
				} finally {
					if (mounted) setLoading(false);
				}
			}
		load();
		return () => {
			mounted = false;
		};
	}, [id]);

		async function changeStatus(newStatus: string) {
			if (!id || Number.isNaN(id)) return;
			setActionLoading(true);
			try {
				const { updateRequestStatus } = await import('../api/internshipRequest');
				const updated = await updateRequestStatus(id, newStatus);
				setItem(updated);
				message.success(`Request ${newStatus.toLowerCase()}`);
			} catch (err: any) {
				message.error(err?.message || 'Unable to change status');
			} finally {
				setActionLoading(false);
			}
		}

	return (
		<div>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
						<h2>Request detail</h2>
						<Space>
							<Button onClick={() => navigate(-1)}>Back</Button>
							<Button type="primary" danger={false} loading={actionLoading} onClick={() => changeStatus('Accepted')}>
								Accept
							</Button>
							<Button type="default" danger loading={actionLoading} onClick={() => changeStatus('Rejected')}>
								Reject
							</Button>
						</Space>
					</div>
			<Card>
				{loading ? (
					<div style={{ textAlign: 'center', padding: 36 }}>
						<Spin />
					</div>
								) : !item ? (
									<div>No details available</div>
				) : (
								<Descriptions column={1} bordered>
									<Descriptions.Item label="First name">{item.firstName}</Descriptions.Item>
									<Descriptions.Item label="Last name">{item.lastName}</Descriptions.Item>
									<Descriptions.Item label="Email">{item.email}</Descriptions.Item>
									<Descriptions.Item label="Department">{item.department}</Descriptions.Item>
									<Descriptions.Item label="Start date">{formatDate(item.startDate) ?? item.startDate}</Descriptions.Item>
									<Descriptions.Item label="End date">{formatDate(item.endDate) ?? item.endDate}</Descriptions.Item>
									<Descriptions.Item label="Motivation">{item.motivation}</Descriptions.Item>
									<Descriptions.Item label="Status">{item.status}</Descriptions.Item>
								</Descriptions>
				)}
			</Card>
		</div>
	);
};

export default DetailPage;
