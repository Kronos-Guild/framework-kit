import type { Meta, StoryObj } from '@storybook/react';
import { SwapInput } from '../kit-components/ui/swap-input';

const SOL_LOGO = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png';
const USDC_LOGO =
	'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png';

const solToken = { symbol: 'SOL', name: 'Solana', logoURI: SOL_LOGO };
const usdcToken = { symbol: 'USDC', name: 'USD Coin', logoURI: USDC_LOGO };

const meta = {
	title: 'Kit Components/Input/SwapInput',
	component: SwapInput,
	tags: ['autodocs'],
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
		disabled: {
			control: 'boolean',
		},
		receiveReadOnly: {
			control: 'boolean',
		},
	},
	decorators: [
		(Story) => (
			<div style={{ width: '400px' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof SwapInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dark variant with empty amounts
 */
export const Default: Story = {
	args: {
		payAmount: '',
		receiveAmount: '',
		payToken: solToken,
		receiveToken: usdcToken,
		payBalance: '4.32',
		variant: 'dark',
		onSwapDirection: () => console.log('Swap direction'),
		onPayAmountChange: () => {},
	},
};

/**
 * Light variant with empty amounts
 */
export const Light: Story = {
	args: {
		...Default.args,
		variant: 'light',
	},
};

/**
 * Zero amounts entered
 */
export const ZeroAmounts: Story = {
	args: {
		payAmount: '0.00',
		receiveAmount: '0.00',
		payToken: solToken,
		receiveToken: usdcToken,
		payBalance: '4.32',
		variant: 'dark',
		onSwapDirection: () => console.log('Swap direction'),
		onPayAmountChange: () => {},
	},
};

/**
 * Filled state with amounts entered
 */
export const Filled: Story = {
	args: {
		payAmount: '1.21',
		receiveAmount: '1324.13',
		payToken: solToken,
		receiveToken: usdcToken,
		payBalance: '4.32',
		variant: 'dark',
		onSwapDirection: () => console.log('Swap direction'),
		onPayAmountChange: () => {},
	},
};

/**
 * Filled state - light variant
 */
export const FilledLight: Story = {
	args: {
		...Filled.args,
		variant: 'light',
	},
};

/**
 * Insufficient balance error state
 */
export const InsufficientBalance: Story = {
	args: {
		payAmount: '4.68',
		receiveAmount: '1324.13',
		payToken: solToken,
		receiveToken: usdcToken,
		payBalance: '4.32',
		variant: 'dark',
		onSwapDirection: () => console.log('Swap direction'),
		onPayAmountChange: () => {},
	},
};

/**
 * Insufficient balance - light variant
 */
export const InsufficientBalanceLight: Story = {
	args: {
		...InsufficientBalance.args,
		variant: 'light',
	},
};

/**
 * Loading/skeleton state
 */
export const Loading: Story = {
	args: {
		payAmount: '',
		receiveAmount: '',
		isLoading: true,
		variant: 'dark',
	},
};

/**
 * Loading - light variant
 */
export const LoadingLight: Story = {
	args: {
		...Loading.args,
		variant: 'light',
	},
};

/**
 * No token selected yet
 */
export const NoTokenSelected: Story = {
	args: {
		payAmount: '',
		receiveAmount: '',
		payBalance: '4.32',
		variant: 'dark',
		onPayTokenSelect: () => console.log('Select pay token'),
		onReceiveTokenSelect: () => console.log('Select receive token'),
		onPayAmountChange: () => {},
	},
};

/**
 * Small size variant
 */
export const SmallSize: Story = {
	args: {
		...Filled.args,
		size: 'sm',
	},
};

/**
 * Large size variant
 */
export const LargeSize: Story = {
	args: {
		...Filled.args,
		size: 'lg',
	},
};

/**
 * Disabled state
 */
export const Disabled: Story = {
	args: {
		...Filled.args,
		disabled: true,
	},
};
