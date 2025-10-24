import { Form, Input, Button } from 'antd';
import type { FormInstance } from 'antd/es/form';

type Field = {
	name: string;
	label?: string;
	placeholder?: string;
	rules?: any[];
	type?: 'text' | 'textarea' | 'email' | 'number';
};

type Props = {
	fields: Field[];
	initialValues?: Record<string, any>;
	onFinish: (values: Record<string, any>) => void;
	submitText?: string;
	form?: FormInstance;
};

export default function TextForm({ fields, initialValues, onFinish, submitText = 'Save', form }: Props) {
	return (
		<Form layout="vertical" onFinish={onFinish} initialValues={initialValues} form={form}>
			{fields.map((f) => (
				<Form.Item key={f.name} name={f.name} label={f.label} rules={f.rules}>
					{f.type === 'textarea' ? (
						<Input.TextArea placeholder={f.placeholder} />
					) : (
						<Input placeholder={f.placeholder} type={f.type === 'number' ? 'number' : 'text'} />
					)}
				</Form.Item>
			))}

			<Form.Item>
				<Button type="primary" htmlType="submit">
					{submitText}
				</Button>
			</Form.Item>
		</Form>
	);
}

