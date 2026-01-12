import type { Meta, StoryObj } from '@storybook/react';
import { Page } from '../kit-components/ui/page/Page';

const meta = {
	title: 'UI/Page',
	component: Page,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'This is a page content.',
	},
};
