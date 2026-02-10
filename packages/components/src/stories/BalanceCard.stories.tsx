import { address, lamports } from '@solana/kit';
import type { Meta, StoryObj } from '@storybook/react';
import { BalanceCard } from '../kit-components/ui/balance-card';

// Sample wallet address for stories
const sampleWalletAddress = address('6DMh7fYHrKdCJwCFUQfMfNAdLADi9xqsRKNzmZA31DkK');
const altWalletAddress = address('9xQeWvG816hKfA2H2HnXHoGZTMbNJrPpT4Hz8knSjLm4');

const meta = {
	title: 'UI/BalanceCard',
	component: BalanceCard,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'dark', 'light'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		isLoading: {
			control: 'boolean',
		},
		isFiatBalance: {
			control: 'boolean',
		},
		defaultExpanded: {
			control: 'boolean',
		},
	},
	decorators: [
		(Story) => (
			<div style={{ width: '320px' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof BalanceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample token data
const sampleTokens = [
	{ symbol: 'USDC', balance: 15.5, fiatValue: 15.5 },
	{ symbol: 'USDT', balance: 10.18, fiatValue: 10.18 },
	{ symbol: 'USDG', balance: 15.5, fiatValue: 15.5 },
];

/**
 * Default dark variant with balance and tokens
 */
export const Default: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(34_810_000_000n),
		isFiatBalance: true,
		tokens: sampleTokens,
		variant: 'dark',
	},
};

/**
 * Light variant
 */
export const Light: Story = {
	args: {
		walletAddress: altWalletAddress,
		totalBalance: lamports(0n),
		isFiatBalance: false,
		tokens: [],
		variant: 'light',
		defaultExpanded: true,
	},
};

/**
 * Loading state - shows skeleton
 */
export const Loading: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(0n),
		isLoading: true,
		variant: 'dark',
	},
};

/**
 * Loading state - light variant
 */
export const LoadingLight: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(0n),
		isLoading: true,
		variant: 'light',
	},
};

/**
 * Zero balance state
 */
export const ZeroBalance: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(0n),
		isFiatBalance: false,
		tokens: [],
		variant: 'dark',
	},
};

/**
 * Zero balance with expanded empty token list
 */
export const ZeroBalanceExpanded: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(0n),
		isFiatBalance: false,
		tokens: [],
		variant: 'dark',
		defaultExpanded: true,
	},
};

/**
 * With tokens expanded
 */
export const WithTokensExpanded: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(34_810_000_000n),
		isFiatBalance: true,
		tokens: sampleTokens,
		variant: 'dark',
		defaultExpanded: true,
	},
};

/**
 * Light variant with tokens expanded
 */
export const LightWithTokensExpanded: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(34_810_000_000n),
		isFiatBalance: true,
		tokens: sampleTokens,
		variant: 'light',
		defaultExpanded: true,
	},
};

/**
 * Error state
 */
export const WithError: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(0n),
		isFiatBalance: true,
		error: 'Error loading tokens.',
		onRetry: () => console.log('Retry clicked'),
		variant: 'dark',
	},
};

/**
 * Error state - light variant
 */
export const WithErrorLight: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(0n),
		isFiatBalance: true,
		error: 'Error loading tokens.',
		onRetry: () => console.log('Retry clicked'),
		variant: 'light',
	},
};

/**
 * Small size variant
 */
export const SmallSize: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(34_810_000_000n),
		isFiatBalance: true,
		tokens: sampleTokens,
		variant: 'dark',
		size: 'sm',
	},
};

/**
 * Large size variant
 */
export const LargeSize: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(34_810_000_000n),
		isFiatBalance: true,
		tokens: sampleTokens,
		variant: 'dark',
		size: 'lg',
	},
};

/**
 * Crypto balance display (non-fiat)
 */
export const CryptoBalance: Story = {
	args: {
		walletAddress: sampleWalletAddress,
		totalBalance: lamports(1_523_400_000n),
		isFiatBalance: false,
		displayDecimals: 4,
		tokens: [{ symbol: 'SOL', balance: 1.5234 }],
		variant: 'dark',
	},
};
