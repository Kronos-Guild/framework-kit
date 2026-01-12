import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../kit-components/ui/header/Header';

const meta = {
	title: 'UI/Header',
	component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Default Header',
	},
};
