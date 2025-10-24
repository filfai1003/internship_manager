import React, { useEffect, useState } from 'react';
import { List, Button, Spin, Empty, Card } from 'antd';
import { formatDate } from '../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

type Internship = {
	id: number;
	firstName: string;
	lastName: string;
	email?: string;
	department?: string;
	startDate?: string;
	endDate?: string;
	status?: string;
};

import { listRequests } from '../api/internshipRequest';
import FilterBar from '../components/FilterBar';

const HomePage: FC = () => {
	const navigate = useNavigate();
	const [items, setItems] = useState<Internship[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [departmentFilter, setDepartmentFilter] = useState<string>('');
	const [statusFilter, setStatusFilter] = useState<string | null>(null);

		useEffect(() => {
			let mounted = true;
			async function load() {
				setLoading(true);
				setError(null);
				try {
					const data = await listRequests();
					if (mounted) setItems(data || []);
						} catch (err: any) {
							if (mounted) setError(err.message || 'Error while loading');
				} finally {
					if (mounted) setLoading(false);
				}
			}
			load();
			return () => {
				mounted = false;
			};
		}, []);

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
					<h2>Internship requests</h2>
					<Button type="primary" onClick={() => navigate('/create')}>
						+ New
					</Button>
				</div>

				<FilterBar
					department={departmentFilter}
					onDepartmentChange={setDepartmentFilter}
					status={statusFilter}
					onStatusChange={setStatusFilter}
					statusOptions={items ? Array.from(new Set(items.map(i => i.status).filter(Boolean))) as string[] : []}
				/>

				<Card>
					{loading ? (
						<div style={{ textAlign: 'center', padding: 36 }}>
							<Spin />
						</div>
					) : error ? (
						<div style={{ color: 'var(--ant-error-color)' }}>{"Error while loading"}</div>
					) : !items || items.length === 0 ? (
						<Empty description="No requests found" />
					) : (
						(() => {
							const statusOpt = statusFilter;
							const filtered = (items || []).filter((item) => {
								// department filter (case-insensitive substring)
								if (departmentFilter && departmentFilter.trim() !== '') {
									const dept = (item.department || '').toLowerCase();
									if (!dept.includes(departmentFilter.trim().toLowerCase())) return false;
								}
								// status filter
								if (statusOpt && statusOpt !== 'All') {
									if (item.status !== statusOpt) return false;
								}
								return true;
							});

							return (
								<List
									itemLayout="horizontal"
									dataSource={filtered}
									renderItem={(item) => (
										<List.Item onClick={() => navigate(`/requests/${item.id}`)} style={{ cursor: 'pointer' }}>
											<List.Item.Meta
												title={`${item.firstName} ${item.lastName}`}
																	description={
																		<span>
																			{item.department ? <strong>{item.department}</strong> : null}
																			{item.startDate ? ` — ${formatDate(item.startDate) ?? item.startDate}` : ''}
																			{item.endDate ? ` → ${formatDate(item.endDate) ?? item.endDate}` : ''}
																		</span>
																	}
											/>
										</List.Item>
									)}
								/>
							);
						})()
					)}
				</Card>
			</div>
		);
};

export default HomePage;
