import type { Meta, StoryObj } from '@storybook/react';
import { TransactionToast } from '../kit-components/ui/transaction-toast';

const mockSignature = '5UfDuX7hXrVoNMYhFpFdYxGE8mLqZnzCYQEHZ8Bj9K8xN2FvYYv5VT7qYRqXLwGKSk3nYhZx';

const meta: Meta<typeof TransactionToast> = {
	title: 'UI/TransactionToast',
	component: TransactionToast,
	tags: ['autodocs'],
	argTypes: {
		status: {
			control: 'select',
			options: ['pending', 'success', 'error'],
		},
		type: {
			control: 'select',
			options: ['sent', 'received', 'swapped'],
		},
		theme: {
			control: 'select',
			options: ['light', 'dark'],
		},
		network: {
			control: 'select',
			options: ['mainnet-beta', 'devnet', 'testnet'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// for status variants

export const Success: Story = {
	args: {
		signature: mockSignature,
		status: 'success',
		type: 'sent',
	},
};

export const Pending: Story = {
	args: {
		signature: mockSignature,
		status: 'pending',
		type: 'sent',
	},
};

export const ErrorState: Story = {
	args: {
		signature: mockSignature,
		status: 'error',
		type: 'sent',
	},
};

// for transaction type variants

export const Sent: Story = {
	args: {
		signature: mockSignature,
		status: 'success',
		type: 'sent',
	},
};

export const Received: Story = {
	args: {
		signature: mockSignature,
		status: 'success',
		type: 'received',
	},
};

export const Swapped: Story = {
	args: {
		signature: mockSignature,
		status: 'success',
		type: 'swapped',
	},
};

// for theme variants

export const Dark: Story = {
	args: {
		signature: mockSignature,
		status: 'success',
		type: 'sent',
		theme: 'dark',
	},
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

export const DarkPending: Story = {
	args: {
		signature: mockSignature,
		status: 'pending',
		type: 'sent',
		theme: 'dark',
	},
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

export const DarkError: Story = {
	args: {
		signature: mockSignature,
		status: 'error',
		type: 'sent',
		theme: 'dark',
	},
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

// for network variants

export const Devnet: Story = {
	args: {
		signature: mockSignature,
		status: 'success',
		type: 'sent',
		network: 'devnet',
	},
};

export const Testnet: Story = {
	args: {
		signature: mockSignature,
		status: 'success',
		type: 'sent',
		network: 'testnet',
	},
};
