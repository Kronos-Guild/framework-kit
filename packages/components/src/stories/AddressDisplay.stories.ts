import { address } from '@solana/kit';
import type { Meta, StoryObj } from '@storybook/react';
import { AddressDisplay } from '../kit-components/ui/address-display';

const sampleAddress = address('Hb6dzd4pYxmFYKkJDWuhzBEUkkaE93sFcvXYtriTkmw9');

const meta: Meta<typeof AddressDisplay> = {
	title: 'UI/AddressDisplay',
	component: AddressDisplay,
	tags: ['autodocs'],
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
		address: sampleAddress,
	},
};

export const Dark: Story = {
	args: {
		address: sampleAddress,
		theme: 'dark',
	},
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

export const Devnet: Story = {
	args: {
		address: sampleAddress,
		network: 'devnet',
	},
};

export const WithoutExplorerLink: Story = {
	args: {
		address: sampleAddress,
		showExplorerLink: false,
	},
};
