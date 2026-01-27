// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { TransactionToast } from './TransactionToast';

const mockSignature = '5UfDuX7hXrVoNMYhFpFdYxGE8mLqZnzCYQEHZ8Bj9K8xN2FvYYv5VT7qYRqXLwGKSk3nYhZx';

afterEach(() => {
	cleanup();
});

describe('TransactionToast', () => {
	// for basic rendering
	it('renders without crashing', () => {
		render(<TransactionToast signature={mockSignature} status="success" />);
		expect(screen.getByText('Transaction sent successfully')).toBeInTheDocument();
	});

	// for status icons
	describe('status icons', () => {
		it('renders spinning loader for pending status', () => {
			const { container } = render(<TransactionToast signature={mockSignature} status="pending" />);
			const loader = container.querySelector('.animate-spin');
			expect(loader).toBeInTheDocument();
		});

		it('renders check icon for success status', () => {
			const { container } = render(<TransactionToast signature={mockSignature} status="success" />);
			const successIcon = container.querySelector('.bg-green-500\\/20');
			expect(successIcon).toBeInTheDocument();
		});

		it('renders X icon for error status', () => {
			const { container } = render(<TransactionToast signature={mockSignature} status="error" />);
			const errorIcon = container.querySelector('.bg-red-500\\/20');
			expect(errorIcon).toBeInTheDocument();
		});
	});

	// for message combinations (3 statuses × 3 types = 9)
	describe('message combinations', () => {
		// sent type
		it('shows correct message for sent + pending', () => {
			render(<TransactionToast signature={mockSignature} status="pending" type="sent" />);
			expect(screen.getByText('Transaction pending...')).toBeInTheDocument();
		});

		it('shows correct message for sent + success', () => {
			render(<TransactionToast signature={mockSignature} status="success" type="sent" />);
			expect(screen.getByText('Transaction sent successfully')).toBeInTheDocument();
		});

		it('shows correct message for sent + error', () => {
			render(<TransactionToast signature={mockSignature} status="error" type="sent" />);
			expect(screen.getByText('Transaction failed')).toBeInTheDocument();
		});

		// received type
		it('shows correct message for received + pending', () => {
			render(<TransactionToast signature={mockSignature} status="pending" type="received" />);
			expect(screen.getByText('Transaction pending...')).toBeInTheDocument();
		});

		it('shows correct message for received + success', () => {
			render(<TransactionToast signature={mockSignature} status="success" type="received" />);
			expect(screen.getByText('Transaction received successfully')).toBeInTheDocument();
		});

		it('shows correct message for received + error', () => {
			render(<TransactionToast signature={mockSignature} status="error" type="received" />);
			expect(screen.getByText('Transaction failed')).toBeInTheDocument();
		});

		// swapped type
		it('shows correct message for swapped + pending', () => {
			render(<TransactionToast signature={mockSignature} status="pending" type="swapped" />);
			expect(screen.getByText('Swap pending...')).toBeInTheDocument();
		});

		it('shows correct message for swapped + success', () => {
			render(<TransactionToast signature={mockSignature} status="success" type="swapped" />);
			expect(screen.getByText('Swap completed successfully')).toBeInTheDocument();
		});

		it('shows correct message for swapped + error', () => {
			render(<TransactionToast signature={mockSignature} status="error" type="swapped" />);
			expect(screen.getByText('Swap failed')).toBeInTheDocument();
		});
	});

	// for theme support
	describe('theme support', () => {
		it('applies light theme by default', () => {
			render(<TransactionToast signature={mockSignature} status="success" />);
			const element = screen.getByText('Transaction sent successfully').parentElement;
			expect(element).toHaveClass('bg-zinc-50');
			expect(element).toHaveClass('text-zinc-900');
		});

		it('applies dark theme when specified', () => {
			render(<TransactionToast signature={mockSignature} status="success" theme="dark" />);
			const element = screen.getByText('Transaction sent successfully').parentElement;
			expect(element).toHaveClass('bg-zinc-800');
			expect(element).toHaveClass('text-zinc-50');
		});
	});

	// for explorer URL generation
	describe('explorer URL generation', () => {
		it('generates correct URL for mainnet-beta (no cluster param)', () => {
			render(<TransactionToast signature={mockSignature} status="success" network="mainnet-beta" />);
			const link = screen.getByRole('link', { name: /view/i });
			expect(link).toHaveAttribute('href', `https://explorer.solana.com/tx/${mockSignature}`);
		});

		it('generates correct URL for devnet', () => {
			render(<TransactionToast signature={mockSignature} status="success" network="devnet" />);
			const link = screen.getByRole('link', { name: /view/i });
			expect(link).toHaveAttribute('href', `https://explorer.solana.com/tx/${mockSignature}?cluster=devnet`);
		});

		it('generates correct URL for testnet', () => {
			render(<TransactionToast signature={mockSignature} status="success" network="testnet" />);
			const link = screen.getByRole('link', { name: /view/i });
			expect(link).toHaveAttribute('href', `https://explorer.solana.com/tx/${mockSignature}?cluster=testnet`);
		});
	});

	// for link security
	describe('link security', () => {
		it('opens explorer link in new tab', () => {
			render(<TransactionToast signature={mockSignature} status="success" />);
			const link = screen.getByRole('link', { name: /view/i });
			expect(link).toHaveAttribute('target', '_blank');
		});

		it('has noopener noreferrer for security', () => {
			render(<TransactionToast signature={mockSignature} status="success" />);
			const link = screen.getByRole('link', { name: /view/i });
			expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		});
	});

	// for accessibility
	describe('accessibility', () => {
		it('has status role for pending transactions', () => {
			render(<TransactionToast signature={mockSignature} status="pending" />);
			const toast = screen.getByRole('status');
			expect(toast).toBeInTheDocument();
		});

		it('has status role for successful transactions', () => {
			render(<TransactionToast signature={mockSignature} status="success" />);
			const toast = screen.getByRole('status');
			expect(toast).toBeInTheDocument();
		});

		it('has alert role for failed transactions', () => {
			render(<TransactionToast signature={mockSignature} status="error" />);
			const toast = screen.getByRole('alert');
			expect(toast).toBeInTheDocument();
		});

		it('has aria-live polite for non-error states', () => {
			render(<TransactionToast signature={mockSignature} status="success" />);
			const toast = screen.getByRole('status');
			expect(toast).toHaveAttribute('aria-live', 'polite');
		});

		it('has aria-live assertive for error state', () => {
			render(<TransactionToast signature={mockSignature} status="error" />);
			const toast = screen.getByRole('alert');
			expect(toast).toHaveAttribute('aria-live', 'assertive');
		});

		it('explorer link has descriptive accessible name', () => {
			render(<TransactionToast signature={mockSignature} status="success" />);
			const link = screen.getByRole('link');
			expect(link).toHaveAccessibleName(/view transaction/i);
		});
	});
});
