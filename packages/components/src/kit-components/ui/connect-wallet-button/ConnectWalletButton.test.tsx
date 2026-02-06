// @vitest-environment jsdom

import { lamports } from '@solana/kit';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { ConnectWalletButton } from './ConnectWalletButton';

afterEach(() => {
	cleanup();
});

const mockWallet = {
	address: '6DMh7fYHrKdCJwCFUQfMfNAdLADi9xqsRKNzmZA31DkK',
};

const mockConnector = {
	id: 'phantom',
	name: 'Phantom',
	icon: 'https://phantom.app/icon.png',
};

const mockBalance = lamports(2_500_000_000n); // 2.5 SOL

describe('ConnectWalletButton', () => {
	describe('disconnected state', () => {
		it('renders "Connect Wallet" text when disconnected', () => {
			render(<ConnectWalletButton status="disconnected" />);
			expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
		});

		it('renders custom connect label when provided', () => {
			render(<ConnectWalletButton status="disconnected" labels={{ connect: 'Link Wallet' }} />);
			expect(screen.getByText('Link Wallet')).toBeInTheDocument();
		});

		it('calls onConnect when button is clicked', () => {
			const onConnect = vi.fn();
			render(<ConnectWalletButton status="disconnected" onConnect={onConnect} />);

			fireEvent.click(screen.getByRole('button'));

			expect(onConnect).toHaveBeenCalledTimes(1);
		});

		it('does not show dropdown menu when disconnected', () => {
			render(<ConnectWalletButton status="disconnected" />);

			fireEvent.click(screen.getByRole('button'));

			// Dropdown content shouldn't be visible
			expect(screen.queryByText('Disconnect')).not.toBeInTheDocument();
		});
	});

	describe('connecting state', () => {
		it('disables button when connecting', () => {
			render(<ConnectWalletButton status="connecting" />);
			expect(screen.getByRole('button')).toBeDisabled();
		});

		it('does not call onConnect when clicked while connecting', () => {
			const onConnect = vi.fn();
			render(<ConnectWalletButton status="connecting" onConnect={onConnect} />);

			fireEvent.click(screen.getByRole('button'));

			expect(onConnect).not.toHaveBeenCalled();
		});
	});

	describe('connected state', () => {
		it('shows wallet info when connected', () => {
			render(<ConnectWalletButton status="connected" wallet={mockWallet} currentConnector={mockConnector} />);

			// Should show wallet name or truncated address, not "Connect Wallet"
			expect(screen.queryByText('Connect Wallet')).not.toBeInTheDocument();
		});

		it('opens dropdown when connected button is clicked', () => {
			render(
				<ConnectWalletButton
					status="connected"
					wallet={mockWallet}
					currentConnector={mockConnector}
					balance={mockBalance}
				/>,
			);

			fireEvent.click(screen.getByRole('button'));

			// Dropdown should now be visible with disconnect option
			expect(screen.getByText('Disconnect')).toBeInTheDocument();
		});

		it('displays wallet address in dropdown', () => {
			render(<ConnectWalletButton status="connected" wallet={mockWallet} currentConnector={mockConnector} />);

			fireEvent.click(screen.getByRole('button'));

			// Should show truncated address
			expect(screen.getByText(/6DMh.*DkK/)).toBeInTheDocument();
		});

		it('displays balance in dropdown when provided', () => {
			render(
				<ConnectWalletButton
					status="connected"
					wallet={mockWallet}
					currentConnector={mockConnector}
					balance={mockBalance}
				/>,
			);

			fireEvent.click(screen.getByRole('button'));

			// Balance should be visible (2.5 SOL)
			expect(screen.getByText(/2\.5/)).toBeInTheDocument();
		});

		it('calls onDisconnect when disconnect is clicked', async () => {
			const onDisconnect = vi.fn();
			render(
				<ConnectWalletButton
					status="connected"
					wallet={mockWallet}
					currentConnector={mockConnector}
					onDisconnect={onDisconnect}
				/>,
			);

			// Open dropdown
			fireEvent.click(screen.getByRole('button'));

			// Click disconnect
			fireEvent.click(screen.getByText('Disconnect'));

			await waitFor(() => {
				expect(onDisconnect).toHaveBeenCalledTimes(1);
			});
		});

		it('closes dropdown after disconnect', async () => {
			const onDisconnect = vi.fn();
			render(
				<ConnectWalletButton
					status="connected"
					wallet={mockWallet}
					currentConnector={mockConnector}
					onDisconnect={onDisconnect}
				/>,
			);

			// Open dropdown
			fireEvent.click(screen.getByRole('button'));
			expect(screen.getByText('Disconnect')).toBeInTheDocument();

			// Click disconnect
			fireEvent.click(screen.getByText('Disconnect'));

			await waitFor(() => {
				expect(screen.queryByText('Disconnect')).not.toBeInTheDocument();
			});
		});

		it('has aria-haspopup when connected', () => {
			render(<ConnectWalletButton status="connected" wallet={mockWallet} currentConnector={mockConnector} />);

			expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'menu');
		});

		it('has aria-expanded that reflects dropdown state', () => {
			render(<ConnectWalletButton status="connected" wallet={mockWallet} currentConnector={mockConnector} />);

			const button = screen.getByRole('button');

			expect(button).toHaveAttribute('aria-expanded', 'false');

			fireEvent.click(button);

			expect(button).toHaveAttribute('aria-expanded', 'true');
		});
	});

	describe('keyboard interactions', () => {
		it('closes dropdown on Escape key', () => {
			render(<ConnectWalletButton status="connected" wallet={mockWallet} currentConnector={mockConnector} />);

			// Open dropdown
			fireEvent.click(screen.getByRole('button'));
			expect(screen.getByText('Disconnect')).toBeInTheDocument();

			// Press Escape
			fireEvent.keyDown(document, { key: 'Escape' });

			expect(screen.queryByText('Disconnect')).not.toBeInTheDocument();
		});
	});

	describe('click outside', () => {
		it('closes dropdown when clicking outside', () => {
			render(
				<div>
					<div data-testid="outside">Outside</div>
					<ConnectWalletButton status="connected" wallet={mockWallet} currentConnector={mockConnector} />
				</div>,
			);

			// Open dropdown
			fireEvent.click(screen.getByRole('button'));
			expect(screen.getByText('Disconnect')).toBeInTheDocument();

			// Click outside
			fireEvent.mouseDown(screen.getByTestId('outside'));

			expect(screen.queryByText('Disconnect')).not.toBeInTheDocument();
		});
	});

	describe('theme variants', () => {
		it('applies dark theme by default', () => {
			const { container } = render(<ConnectWalletButton status="disconnected" />);
			// The button should have dark theme classes
			expect(container.querySelector('button')).toBeInTheDocument();
		});

		it('accepts light theme prop', () => {
			render(<ConnectWalletButton status="disconnected" theme="light" />);
			expect(screen.getByRole('button')).toBeInTheDocument();
		});
	});

	describe('SSR / hydration', () => {
		it('shows disconnected state when isReady is false', () => {
			render(
				<ConnectWalletButton
					status="connected"
					wallet={mockWallet}
					currentConnector={mockConnector}
					isReady={false}
				/>,
			);

			// Should show connect button, not connected state
			expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
		});

		it('disables button when isReady is false', () => {
			render(<ConnectWalletButton status="disconnected" isReady={false} />);
			expect(screen.getByRole('button')).toBeDisabled();
		});
	});

	describe('balance loading', () => {
		it('handles balanceLoading state', () => {
			render(
				<ConnectWalletButton
					status="connected"
					wallet={mockWallet}
					currentConnector={mockConnector}
					balanceLoading={true}
				/>,
			);

			// Open dropdown
			fireEvent.click(screen.getByRole('button'));

			// Component should render without error when balance is loading
			expect(screen.getByText('Disconnect')).toBeInTheDocument();
		});

		it('handles undefined balance gracefully', () => {
			render(
				<ConnectWalletButton
					status="connected"
					wallet={mockWallet}
					currentConnector={mockConnector}
					balance={undefined}
				/>,
			);

			// Open dropdown
			fireEvent.click(screen.getByRole('button'));

			// Should render without crashing
			expect(screen.getByText('Disconnect')).toBeInTheDocument();
		});
	});

	describe('custom className', () => {
		it('applies additional className to container', () => {
			const { container } = render(<ConnectWalletButton status="disconnected" className="custom-class" />);
			expect(container.firstChild).toHaveClass('custom-class');
		});
	});

	describe('error status', () => {
		it('shows disconnected state when status is error', () => {
			render(<ConnectWalletButton status="error" />);
			// Error status should fall back to disconnected UI
			expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
		});

		it('allows reconnection when in error state', () => {
			const onConnect = vi.fn();
			render(<ConnectWalletButton status="error" onConnect={onConnect} />);

			fireEvent.click(screen.getByRole('button'));

			expect(onConnect).toHaveBeenCalledTimes(1);
		});
	});

	describe('custom labels', () => {
		it('renders custom disconnect label', () => {
			render(
				<ConnectWalletButton
					status="connected"
					wallet={mockWallet}
					currentConnector={mockConnector}
					labels={{ disconnect: 'Log Out' }}
				/>,
			);

			fireEvent.click(screen.getByRole('button'));

			expect(screen.getByText('Log Out')).toBeInTheDocument();
		});
	});

	describe('missing handlers', () => {
		it('handles missing onConnect gracefully when disconnected', () => {
			render(<ConnectWalletButton status="disconnected" />);
			// Should not crash when clicking without handler
			expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow();
		});

		it('handles missing onDisconnect gracefully when connected', () => {
			render(<ConnectWalletButton status="connected" wallet={mockWallet} currentConnector={mockConnector} />);

			// Open dropdown and click disconnect
			fireEvent.click(screen.getByRole('button'));
			// Should not crash when clicking disconnect without handler
			expect(() => fireEvent.click(screen.getByText('Disconnect'))).not.toThrow();
		});

		it('handles missing wallet object when connected', () => {
			render(<ConnectWalletButton status="connected" currentConnector={mockConnector} />);
			// Should fall back to disconnected state
			expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
		});
	});
});
