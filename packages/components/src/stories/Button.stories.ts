import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../kit-components/ui/button/Button';

const meta = {
	title: 'UI/Button',
	component: Button,
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'outline'],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Default Button',
		variant: 'default',
	},
};

export const Outline: Story = {
	args: {
		children: 'Outline Button',
		variant: 'outline',
	},
};
