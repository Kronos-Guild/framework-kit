'use client';

import { cn } from '../../../lib/utils';
import { StatusIndicator } from './StatusIndicator';
import type { NetworkOptionProps, Theme } from './types';

/** Theme-specific styles */
const themeStyles: Record<Theme, { selected: string; unselected: string }> = {
	dark: {
		selected: 'bg-zinc-600 text-zinc-50',
		unselected: 'text-zinc-50/70 hover:bg-zinc-600/50',
	},
	light: {
		selected: 'bg-zinc-200/40 text-zinc-700',
		unselected: 'text-zinc-700 hover:bg-zinc-200/30',
	},
};

/**
 * NetworkOption - A single network option in the dropdown.
 * Dimensions from Figma: 175px (auto from container) x 29px
 */
export function NetworkOption({
	network,
	isSelected = false,
	status,
	theme = 'dark',
	onClick,
	className,
}: NetworkOptionProps) {
	const styles = themeStyles[theme];

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'w-full h-[29px] flex items-center justify-between p-[6px] rounded-[3px]',
				'transition-colors cursor-pointer',
				"font-['Inter',sans-serif] font-normal text-[14px] leading-normal",
				'focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30',
				isSelected ? styles.selected : styles.unselected,
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
