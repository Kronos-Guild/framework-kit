import { Check, Copy } from 'lucide-react';
import type React from 'react';
import { useCallback, useState } from 'react';
import walletIconDark from './assets/wallet-icon-dark.png';
import walletIconLight from './assets/wallet-icon-light.png';
import type { WalletAddressProps } from './types';
import { copyToClipboard, truncateAddress } from './utils';

/**
 * Displays a truncated wallet address with copy functionality
 */
export const WalletAddress: React.FC<WalletAddressProps> = ({
	address,
	startChars = 4,
	endChars = 4,
	onCopy,
	variant = 'default',
	className = '',
}) => {
	const [copied, setCopied] = useState(false);
	const isDark = variant === 'dark' || variant === 'default';

	const handleCopy = useCallback(async () => {
		const success = await copyToClipboard(address);
		if (success) {
			setCopied(true);
			onCopy?.(address);
			setTimeout(() => setCopied(false), 2000);
		}
	}, [address, onCopy]);

	const textColor = isDark ? 'text-zinc-300' : 'text-zinc-600';
	const iconColor = isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-700';
	const walletIcon = isDark ? walletIconDark : walletIconLight;

	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<img src={walletIcon} alt="" className="w-5 h-5" aria-hidden="true" />
			<span className={`text-sm font-mono ${textColor}`}>{truncateAddress(address, startChars, endChars)}</span>
			<button
				type="button"
				onClick={handleCopy}
				className={`p-1 rounded transition-colors ${iconColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
				aria-label={copied ? 'Address copied' : 'Copy wallet address'}
			>
				{copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
			</button>
		</div>
	);
};
