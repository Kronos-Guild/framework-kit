'use client';

import { cn } from '@/lib/utils';
import { StatusIndicator } from './StatusIndicator';
import type { NetworkOptionProps } from './types';

/**
 * NetworkOption - A single network option in the dropdown.
 * Dimensions from Figma: 175px (auto from container) x 29px
 */
export function NetworkOption({ network, isSelected = false, status, onClick, className }: NetworkOptionProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'w-full h-[29px] flex items-center justify-between p-[6px] rounded-[3px]',
				'transition-colors cursor-pointer',
				"font-['Inter',sans-serif] font-normal text-[14px] leading-normal",
				'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				isSelected ? 'bg-accent text-card-foreground' : 'text-muted-foreground hover:bg-accent',
				className,
			)}
			aria-selected={isSelected}
			role="option"
		>
			<span>{network.label}</span>
			{isSelected && status && <StatusIndicator status={status} />}
		</button>
	);
}
