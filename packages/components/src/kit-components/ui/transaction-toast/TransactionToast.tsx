import type { ClusterMoniker } from '@solana/client';
import { Check, ExternalLink, Loader2, X } from 'lucide-react';
import type React from 'react';
import { cn } from '../../lib/utils';

//define interfaces for Typescript types
// for transacction status
export type TransactionStatus = 'pending' | 'success' | 'error';

//transaction type to determine the message shown
export type TransactionType = 'sent' | 'received' | 'swapped';

// props for triggering a toast
export interface TransactionToastData {
	// Solana transaction signature
	signature: string;
	// status of the transaction
	status: TransactionStatus;
	// type of transaction
	type?: TransactionType;
	// network for explorer URL (default: 'mainnet-beta')
	network?: ClusterMoniker;
}

//Props for the visual toast component
export interface TransactionToastProps extends TransactionToastData {
	// color theme (default: 'light')
	theme?: 'light' | 'dark';
	// auto-dismiss after timeout (default: 5000ms for success, infinity for pending/error)
	duration?: number;
	// additional CSS classes
	className?: string;
}

// define messages for different transaction types and statuses
const MESSAGES: Record<TransactionType, Record<TransactionStatus, string>> = {
	sent: {
		pending: 'Transaction pending...',
		success: 'Transaction sent successfully',
		error: 'Transaction failed',
	},
	received: {
		pending: 'Transaction pending...',
		success: 'Transaction received successfully',
		error: 'Transaction failed',
	},
	swapped: {
		pending: 'Swap pending...',
		success: 'Swap completed successfully',
		error: 'Swap failed',
	},
};

//default duration for messages based on status
export const DEFAULT_DURATION: Record<TransactionStatus, number> = {
	pending: Infinity,
	success: 5000,
	error: Infinity,
};

//builds Solana explorer URL based on network
function getExplorerUrl(signature: string, network: ClusterMoniker): string {
	const base = 'https://explorer.solana.com';
	const isMainnet = network === 'mainnet-beta' || network === 'mainnet';
	const cluster = isMainnet ? '' : `?cluster=${network}`;
	return `${base}/tx/${signature}${cluster}`;
}

//component to display the toast
export const TransactionToast: React.FC<TransactionToastProps> = ({
	signature,
	status,
	type = 'sent',
	network = 'mainnet-beta',
	theme = 'light',
	className,
}) => {
	const isDark = theme === 'dark';
	const message = MESSAGES[type][status];
	const explorerUrl = getExplorerUrl(signature, network);

	// Accessibility: error state needs immediate attention
	const role = status === 'error' ? 'alert' : 'status';
	const ariaLive = status === 'error' ? 'assertive' : 'polite';

	return (
		<div
			role={role}
			aria-live={ariaLive}
			className={cn(
				'inline-flex items-center gap-2 rounded-md px-2 py-2',
				isDark ? 'bg-zinc-800 text-zinc-50' : 'bg-zinc-50 text-zinc-900',
				className,
			)}
		>
			{/* Icon based on status */}
			{status === 'pending' && <Loader2 size={16} className="animate-spin text-zinc-500" />}
			{status === 'success' && (
				<div className="flex size-4 items-center justify-center rounded-full bg-green-500/20">
					<Check size={12} className="text-green-600" />
				</div>
			)}
			{status === 'error' && (
				<div className="flex size-4 items-center justify-center rounded-full bg-red-500/20">
					<X size={12} className="text-red-600" />
				</div>
			)}

			{/* Message and action */}
			<span className="text-sm">{message}</span>
			<a
				href={explorerUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="View transaction on Solana Explorer"
				className={cn(
					'inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs',
					isDark
						? 'bg-zinc-700 text-zinc-50 hover:bg-zinc-600'
						: 'bg-zinc-700 text-zinc-50 hover:bg-zinc-600',
				)}
			>
				View
				<ExternalLink size={10} />
			</a>
		</div>
	);
};
