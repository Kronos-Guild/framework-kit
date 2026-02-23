'use client';

import { cn } from '@/lib/utils';
import { NetworkOption } from './NetworkOption';
import type { NetworkDropdownProps } from './types';

/**
 * NetworkDropdown - Expanded dropdown showing all network options.
 * Dimensions from Figma: 191px x auto (based on items)
 */
export function NetworkDropdown({
	selectedNetwork,
	status = 'connected',
	networks,
	onSelect,
	className,
}: NetworkDropdownProps) {
	return (
		<div
			className={cn('w-[191px] flex flex-col gap-1 p-2 rounded-[10px]', 'bg-secondary', className)}
			role="listbox"
			aria-label="Select network"
		>
			{networks.map((network) => (
				<NetworkOption
					key={network.id}
					network={network}
					isSelected={network.id === selectedNetwork}
					status={network.id === selectedNetwork ? status : undefined}
					onClick={() => onSelect?.(network.id)}
				/>
			))}
		</div>
	);
}
