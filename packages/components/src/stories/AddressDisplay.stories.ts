import type { Meta, StoryObj } from '@storybook/react';
import { AddressDisplay } from '../kit-components/ui/address-display';

const meta: Meta<typeof AddressDisplay> = {
	title: 'UI/AddressDisplay',
	component: AddressDisplay,
	argTypes: {
		theme: {
			control: 'select',
			options: ['light', 'dark'],
		},
		network: {
			control: 'select',
			options: ['mainnet-beta', 'devnet', 'testnet'],
		},
		showExplorerLink: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		address: 'Hb6dzd4pYxmFYKkJDWuhzBEUkkaE93sFcvXYtriTkmw9',
	},
};

export const Dark: Story = {
	args: {
		address: 'Hb6dzd4pYxmFYKkJDWuhzBEUkkaE93sFcvXYtriTkmw9',
		theme: 'dark',
	},
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

export const Devnet: Story = {
	args: {
		address: 'Hb6dzd4pYxmFYKkJDWuhzBEUkkaE93sFcvXYtriTkmw9',
		network: 'devnet',
	},
};

export const WithoutExplorerLink: Story = {
	args: {
		address: 'Hb6dzd4pYxmFYKkJDWuhzBEUkkaE93sFcvXYtriTkmw9',
		showExplorerLink: false,
	},
};
