import type { WalletConnectorMetadata } from '@solana/client';
import { cn } from '../../../lib/utils';
import type { WalletLabelType, WalletModalTheme } from './types';
import { WalletLabel } from './WalletLabel';

export interface WalletCardProps {
	/** Wallet information to display */
	wallet: WalletConnectorMetadata;
	/** Optional label to show (Recent, Detected, Installed) */
	label?: WalletLabelType;
	/** Theme variant */
	theme?: WalletModalTheme;
	/** Position in the list for border radius */
	position?: 'first' | 'middle' | 'last' | 'only';
	/** Whether this card is currently hovered/focused */
	isHovered?: boolean;
	/** Click handler when wallet is selected */
	onSelect?: (wallet: WalletConnectorMetadata) => void;
	/** Whether the card is disabled (e.g., during connection) */
	disabled?: boolean;
	/** Additional class names */
	className?: string;
}

/**
 * WalletCard - Individual wallet row in the wallet selection list
 *
 * Features:
 * - Wallet icon (32x32, rounded)
 * - Wallet name
 * - Optional label (Recent, Detected)
 * - Hover state with background change
 * - Position-aware border radius (first/middle/last)
 *
 * @example
 * ```tsx
 * <WalletCard
 *   wallet={{ id: 'phantom', name: 'Phantom', icon: '/phantom.png', label: 'recent' }}
 *   theme="dark"
 *   position="first"
 *   onSelect={(w) => console.log('Selected:', w.name)}
 * />
 * ```
 */
export function WalletCard({
	wallet,
	label,
	theme = 'dark',
	position = 'middle',
	isHovered = false,
	onSelect,
	disabled = false,
	className,
}: WalletCardProps) {
	// Border radius based on position
	const positionClasses = {
		first: 'rounded-t-[15px]',
		middle: '',
		last: 'rounded-b-[15px]',
		only: 'rounded-[15px]',
	};

	// Border classes for middle items
	const borderClasses =
		position === 'middle'
			? theme === 'dark'
				? 'border-y-[0.5px] border-zinc-200/20'
				: 'border-y-[0.5px] border-zinc-200/80'
			: '';

	return (
		<button
			type="button"
			onClick={() => onSelect?.(wallet)}
			disabled={disabled}
			className={cn(
				// Base styles
				'w-full flex items-center justify-between px-4 py-3 transition-colors',
				// Position-based border radius
				positionClasses[position],
				// Border for middle items
				borderClasses,
				// Dark theme
				theme === 'dark' && [isHovered ? 'bg-zinc-600/60' : 'bg-zinc-600/20', 'hover:bg-zinc-600/60'],
				// Light theme
				theme === 'light' && [isHovered ? 'bg-zinc-200/30' : 'bg-zinc-100/40', 'hover:bg-zinc-200/30'],
				// Disabled state
				disabled && 'opacity-50 cursor-not-allowed',
				// Focus styles
				'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
				theme === 'dark' ? 'focus-visible:ring-white/30' : 'focus-visible:ring-zinc-400',
				className,
			)}
		>
			{/* Wallet identity: icon + name */}
			<div className="flex items-center gap-2.5">
				{/* Wallet icon */}
				<div className="size-8 rounded-full overflow-hidden shrink-0">
					<img src={wallet.icon} alt={`${wallet.name} logo`} className="size-full object-cover" />
				</div>

				{/* Wallet name */}
				<span className={cn('text-base font-medium', theme === 'dark' ? 'text-zinc-50' : 'text-zinc-700')}>
					{wallet.name}
				</span>
			</div>

			{/* Label (Recent, Detected) */}
			{label && <WalletLabel type={label} theme={theme} />}
		</button>
	);
}
