// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { lamports } from '@solana/client';
import { address } from '@solana/kit';
import { ConnectWalletButton } from './ConnectWalletButton';

const mockAddress = address('6DMh7gJwvuTq3Bpf8rPVGPjzqnz1DkK3H1mVh9kP1DkK');
const mockBalance = lamports(1120000000n); // 1.12 SOL

const mockConnector = {
	id: 'phantom',
	name: 'Phantom',
	icon: 'data:image/svg+xml,<svg></svg>',
};

afterEach(() => {
	cleanup();
});

describe('ConnectWalletButton', () => {
	// Basic rendering tests
	describe('basic rendering', () => {
		it('renders "Connect Wallet" when disconnected', () => {
			render(<ConnectWalletButton status="disconnected" onConnect={() => {}} onDisconnect={() => {}} />);
			expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
		});

		it('renders spinner when connecting', () => {
			const { container } = render(
				<ConnectWalletButton status="connecting" onConnect={() => {}} onDisconnect={() => {}} />,
			);
			const spinner = container.querySelector('.animate-spin');
			expect(spinner).toBeInTheDocument();
		});

		it('renders wallet icon when connected', () => {
			const { container } = render(
				<ConnectWalletButton
					status="connected"
					wallet={{ address: mockAddress }}
					currentConnector={mockConnector}
					balance={mockBalance}
					onConnect={() => {}}
					onDisconnect={() => {}}
				/>,
			);
			const img = container.querySelector('img');
			expect(img).toBeInTheDocument();
		});
	});

	// Dropdown tests
	describe('dropdown behavior', () => {
		it('opens dropdown when connected button is clicked', async () => {
			render(
				<ConnectWalletButton
					status="connected"
					wallet={{ address: mockAddress }}
					currentConnector={mockConnector}
					balance={mockBalance}
					onConnect={() => {}}
					onDisconnect={() => {}}
				/>,
			);

			// Click the button to open dropdown
			const button = screen.getByRole('button');
			fireEvent.click(button);

			// Check that disconnect button appears in dropdown
			await waitFor(() => {
				expect(screen.getByText('Disconnect')).toBeInTheDocument();
			});
		});

		it('closes dropdown on escape key', async () => {
			render(
				<ConnectWalletButton
					status="connected"
					wallet={{ address: mockAddress }}
					currentConnector={mockConnector}
					balance={mockBalance}
					onConnect={() => {}}
					onDisconnect={() => {}}
				/>,
			);

			// Open dropdown
			const button = screen.getByRole('button');
			fireEvent.click(button);

			// Wait for dropdown to appear
			await waitFor(() => {
				expect(screen.getByText('Disconnect')).toBeInTheDocument();
			});

			// Press escape to close
			fireEvent.keyDown(document, { key: 'Escape' });

			// Check that disconnect button is no longer visible
			await waitFor(() => {
				expect(screen.queryByText('Disconnect')).not.toBeInTheDocument();
			});
		});
	});

	// Network integration tests
	describe('network switcher integration', () => {
		it('passes network props to dropdown', async () => {
			const onNetworkChange = vi.fn();

			render(
				<ConnectWalletButton
					status="connected"
					wallet={{ address: mockAddress }}
					currentConnector={mockConnector}
					balance={mockBalance}
					onConnect={() => {}}
					onDisconnect={() => {}}
					selectedNetwork="devnet"
					networkStatus="connected"
					onNetworkChange={onNetworkChange}
				/>,
			);

			// Open dropdown
			const button = screen.getByRole('button');
			fireEvent.click(button);

			// Wait for dropdown to appear
			await waitFor(() => {
				expect(screen.getByText('Disconnect')).toBeInTheDocument();
			});

			// Check that Network text appears (from NetworkSwitcher)
			expect(screen.getByText('Network')).toBeInTheDocument();
		});

		it('renders without network props (optional)', async () => {
			render(
				<ConnectWalletButton
					status="connected"
					wallet={{ address: mockAddress }}
					currentConnector={mockConnector}
					balance={mockBalance}
					onConnect={() => {}}
					onDisconnect={() => {}}
				/>,
			);

			// Open dropdown
			const button = screen.getByRole('button');
			fireEvent.click(button);

			// Wait for dropdown to appear
			await waitFor(() => {
				expect(screen.getByText('Disconnect')).toBeInTheDocument();
			});

			// NetworkSwitcher should still be there with defaults
			expect(screen.getByText('Network')).toBeInTheDocument();
		});
	});

	// Theme tests
	describe('theme support', () => {
		it('applies dark theme styles', () => {
			const { container } = render(
				<ConnectWalletButton status="disconnected" theme="dark" onConnect={() => {}} onDisconnect={() => {}} />,
			);
			const button = container.querySelector('button');
			// Figma (23:33): dark disconnected uses filled variant → bg-zinc-700
			expect(button).toHaveClass('bg-zinc-700');
		});

		it('applies light theme styles', () => {
			const { container } = render(
				<ConnectWalletButton
					status="disconnected"
					theme="light"
					onConnect={() => {}}
					onDisconnect={() => {}}
				/>,
			);
			const button = container.querySelector('button');
			// Figma (23:42): light disconnected uses outline variant → bg-white
			expect(button).toHaveClass('bg-white');
		});
	});

	// Callback tests
	describe('callbacks', () => {
		it('calls onConnect when disconnected button is clicked', () => {
			const onConnect = vi.fn();
			render(<ConnectWalletButton status="disconnected" onConnect={onConnect} onDisconnect={() => {}} />);

			const button = screen.getByRole('button');
			fireEvent.click(button);

			expect(onConnect).toHaveBeenCalledTimes(1);
		});

		it('calls onDisconnect when disconnect button is clicked', async () => {
			const onDisconnect = vi.fn();
			render(
				<ConnectWalletButton
					status="connected"
					wallet={{ address: mockAddress }}
					currentConnector={mockConnector}
					balance={mockBalance}
					onConnect={() => {}}
					onDisconnect={onDisconnect}
				/>,
			);

			// Open dropdown
			const button = screen.getByRole('button');
			fireEvent.click(button);

			// Wait for dropdown and click disconnect
			await waitFor(() => {
				expect(screen.getByText('Disconnect')).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText('Disconnect'));
			expect(onDisconnect).toHaveBeenCalledTimes(1);
		});
	});

	// Balance display tests
	describe('balance display', () => {
		it('shows loading state when balanceLoading is true', async () => {
			render(
				<ConnectWalletButton
					status="connected"
					wallet={{ address: mockAddress }}
					currentConnector={mockConnector}
					balanceLoading={true}
					onConnect={() => {}}
					onDisconnect={() => {}}
				/>,
			);

			// Open dropdown
			const button = screen.getByRole('button');
			fireEvent.click(button);

			// Wait for dropdown
			await waitFor(() => {
				expect(screen.getByText('Disconnect')).toBeInTheDocument();
			});

			// WalletDropdown shows "Loading..." text when balanceLoading is true
			expect(screen.getByText('Loading...')).toBeInTheDocument();
		});
	});
});
