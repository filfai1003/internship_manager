import { Alert } from 'antd';

type Props = {
	message?: string;
	description?: string;
	visible?: boolean;
	onClose?: () => void;
	showIcon?: boolean;
};

export default function ErrorMessage({
	message = 'Error',
	description,
	visible = true,
	onClose,
	showIcon = true,
}: Props) {
	if (!visible) return null;

	return (
		<Alert
			type="error"
			message={message}
			description={description}
			showIcon={showIcon}
			closable={!!onClose}
			onClose={onClose}
			style={{ marginBottom: 12 }}
		/>
	);
}

