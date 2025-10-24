import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

type Props = ButtonProps & {
	children: React.ReactNode;
};

export default function PrimaryButton({ children, ...rest }: Props) {
	return (
		<Button type="primary" {...rest}>
			{children}
		</Button>
	);
}

