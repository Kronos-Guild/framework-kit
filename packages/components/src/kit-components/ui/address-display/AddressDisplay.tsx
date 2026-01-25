import { Check, Copy, ExternalLink } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface AddressDisplayProps {
	/** Solana public key in base58 format */
	address: string;
	/** Callback fired after address is copied to clipboard */
	onCopy?: () => void;
	/** Show link to Solana Explorer (default: true) */
	showExplorerLink?: boolean;
	/** Solana network for Explorer URL (default: "mainnet-beta") */
	network?: 'mainnet-beta' | 'devnet' | 'testnet';
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
	const cluster = network === 'mainnet-beta' ? '' : `?cluster=${network}`;
	return `${base}/address/${address}${cluster}`;
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({
	address,
	onCopy,
	showExplorerLink = true,
	network = 'mainnet-beta',
	theme = 'light',
	className,
}) => {
	const [copied, setCopied] = useState(false);
	const truncated = truncateAddress(address);

	const colors = {
		chip: theme === 'dark' ? 'rgba(63, 63, 70, 0.9)' : 'rgba(228, 228, 231, 0.4)',
		text: theme === 'dark' ? 'rgba(250, 250, 250, 0.9)' : 'rgba(63, 63, 70, 0.9)',
		icon: theme === 'dark' ? '#FAFAFA' : '#3F3F46',
		tooltip: theme === 'dark' ? 'rgba(39, 39, 42, 0.95)' : 'rgba(255, 253, 237, 0.95)',
		tooltipText: theme === 'dark' ? '#FAFAFA' : '#18181B',
		tooltipBorder: theme === 'dark' ? 'rgba(82, 82, 91, 0.9)' : 'rgba(228, 228, 231, 0.8)',
	};

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
		<span className={`relative inline-flex flex-col items-start gap-1 group ${className ?? ''}`}>
			{/* Tooltip */}
			<span
				className="absolute top-full left-0 mt-1 px-3 py-1.5 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
				style={{
					backgroundColor: colors.tooltip,
					color: colors.tooltipText,
					fontSize: '9px',
					border: `1px solid ${colors.tooltipBorder}`,
				}}
			>
				{address}
			</span>

			{/* Chip */}
			<span
				className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 w-fit"
				style={{ backgroundColor: colors.chip }}
			>
				<span className="font-sans text-sm" style={{ color: colors.text }}>
					{truncated}
				</span>
				<button
					type="button"
					onClick={handleCopy}
					className="flex items-center justify-center hover:opacity-70 transition-opacity"
					aria-label="Copy address to clipboard"
				>
					{copied ? (
						<Check size={14} style={{ color: '#22c55e' }} />
					) : (
						<Copy size={14} style={{ color: colors.icon }} />
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
						<ExternalLink size={14} style={{ color: colors.icon }} />
					</a>
				)}
			</span>
		</span>
	);
};
