import type { ClusterMoniker } from '@solana/client';
import type { Address } from '@solana/kit';
import { Check, Copy, ExternalLink } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface AddressDisplayProps {
	/** Solana public key in base58 format */
	address: Address;
	/** Callback fired after address is copied to clipboard */
	onCopy?: () => void;
	/** Show link to Solana Explorer (default: true) */
	showExplorerLink?: boolean;
	/** Show full address tooltip on hover (default: true) */
	showTooltip?: boolean;
	/** Solana network for Explorer URL (default: "mainnet-beta") */
	network?: ClusterMoniker;
	/** Color theme (default: "light") */
	theme?: 'light' | 'dark';
	/** Additional CSS classes to apply to the container */
	className?: string;
}

/** Truncates a Solana address to format: "6DMh...1DkK" */
export function truncateAddress(address: string): string {
	if (address.length <= 8) return address;
	return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

/** Builds Solana Explorer URL for the given address and network */
export function getExplorerUrl(address: string, network: string): string {
	const base = 'https://explorer.solana.com';
	const isMainnet = network === 'mainnet-beta' || network === 'mainnet';
	const cluster = isMainnet ? '' : `?cluster=${network}`;
	return `${base}/address/${address}${cluster}`;
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({
	address,
	onCopy,
	showExplorerLink = true,
	showTooltip = true,
	network = 'mainnet-beta',
	theme = 'light',
	className,
}) => {
	const [copied, setCopied] = useState(false);
	const truncated = truncateAddress(address);
	const isDark = theme === 'dark';

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(address);
			setCopied(true);
			onCopy?.();
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy address:', err);
		}
	};

	return (
		<span className={cn('relative inline-flex flex-col items-start gap-1', className)}>
			{/* Chip */}
			<span
				className={cn(
					'inline-flex items-center gap-2 rounded-md px-3 py-1.5 w-fit',
					isDark ? 'bg-zinc-700/90' : 'bg-zinc-200/40',
				)}
			>
				{/* Address text with tooltip - hover only on address */}
				<span
					className={cn(
						'group/address relative font-sans text-sm',
						isDark ? 'text-zinc-50/90' : 'text-zinc-700/90',
					)}
				>
					{truncated}
					{/* Tooltip */}
					{showTooltip && (
						<span
							className={cn(
								'absolute top-full left-0 mt-1 px-3 py-1.5 rounded-md text-[9px] whitespace-nowrap',
								'opacity-0 group-hover/address:opacity-100 transition-opacity pointer-events-none z-10 border',
								isDark
									? 'bg-zinc-800/95 text-zinc-50 border-zinc-600/90'
									: 'bg-zinc-100/95 text-zinc-900 border-zinc-200/80',
							)}
						>
							{address}
						</span>
					)}
				</span>
				<button
					type="button"
					onClick={handleCopy}
					className="flex items-center justify-center hover:opacity-70 transition-opacity"
					aria-label="Copy address to clipboard"
				>
					{copied ? (
						<Check size={14} className="text-green-500" />
					) : (
						<Copy size={14} className={cn(isDark ? 'text-zinc-50' : 'text-zinc-700')} />
					)}
				</button>
				{showExplorerLink && (
					<a
						href={getExplorerUrl(address, network)}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center hover:opacity-70 transition-opacity"
						aria-label="View on Solana Explorer"
					>
						<ExternalLink size={14} className={cn(isDark ? 'text-zinc-50' : 'text-zinc-700')} />
					</a>
				)}
			</span>
		</span>
	);
};
