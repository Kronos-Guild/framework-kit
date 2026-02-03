import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../kit-components/ui/skeleton';

const meta: Meta<typeof Skeleton> = {
	title: 'UI/Skeleton',
	component: Skeleton,
	tags: ['autodocs'],
	argTypes: {
		theme: {
			control: 'select',
			options: ['light', 'dark'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		className: 'h-4 w-32',
	},
};

export const TextLine: Story = {
	args: {
		className: 'h-4 w-48',
	},
};

export const Avatar: Story = {
	args: {
		className: 'h-12 w-12 rounded-full',
	},
};

export const Card: Story = {
	args: {
		className: 'h-24 w-full',
	},
};

export const Dark: Story = {
	args: {
		className: 'h-4 w-32',
		theme: 'dark',
	},
	parameters: {
		backgrounds: { default: 'dark' },
	},
};
