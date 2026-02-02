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
 * Dimensions from Figma: 191px x auto (based on items)
 */
export function NetworkDropdown({
	selectedNetwork,
	status = 'connected',
	networks,
	onSelect,
	theme = 'dark',
	className,
}: NetworkDropdownProps) {
	return (
		<div
			className={cn(
				'w-[191px] flex flex-col gap-[4px] p-[8px] rounded-[10px]',
				containerStyles[theme],
				className,
			)}
			role="listbox"
			aria-label="Select network"
		>
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
