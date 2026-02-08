'use client';

import { cn } from '../../../lib/utils';
import { NetworkOption } from './NetworkOption';
import type { NetworkDropdownProps, Theme } from './types';

/** Theme-specific container styles */
const containerStyles: Record<Theme, string> = {
	dark: 'bg-zinc-700',
	light: 'bg-zinc-50',
};

/**
 * NetworkDropdown - Expanded dropdown showing all network options.
 * Dimensions from Figma: 191px x auto (standalone) or flexible (embedded)
 */
export function NetworkDropdown({
	selectedNetwork,
	status = 'connected',
	networks,
	onSelect,
	theme = 'dark',
	variant = 'standalone',
	className,
}: NetworkDropdownProps) {
	const isEmbedded = variant === 'embedded';

	return (
		<div
			className={cn(
				'flex flex-col gap-1',
				// Standalone: own container with bg, width, padding, and radius
				!isEmbedded && ['w-47.75 p-2 rounded-[10px]', containerStyles[theme]],
				// Embedded: bare content, no own bg/radius (inherits from parent)
				isEmbedded && 'w-full',
				className,
			)}
			role="listbox"
			aria-label="Select network"
		>
			{/* Network options */}
			{networks.map((network) => (
				<NetworkOption
					key={network.id}
					network={network}
					isSelected={network.id === selectedNetwork}
					status={network.id === selectedNetwork ? status : undefined}
					theme={theme}
					onClick={() => onSelect?.(network.id)}
				/>
			))}
		</div>
	);
}
