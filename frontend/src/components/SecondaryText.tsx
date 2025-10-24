import React from 'react';
import { Typography } from 'antd';

type Props = {
	children: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
};

export default function SecondaryText({ children, style, className }: Props) {
	return (
		<Typography.Text type="secondary" style={style} className={className}>
			{children}
		</Typography.Text>
	);
}

