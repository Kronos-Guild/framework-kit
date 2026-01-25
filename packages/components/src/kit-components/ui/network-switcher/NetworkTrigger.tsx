'use client';

import { ChevronRight, Network } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { NetworkTriggerProps, Theme } from './types';

/** Theme-specific styles */
const themeStyles: Record<Theme, { bg: string; text: string; border: string }> = {
	dark: {
		bg: 'bg-zinc-700',
		text: 'text-zinc-50',
		border: 'border-zinc-200/20',
	},
	light: {
		bg: 'bg-zinc-50',
		text: 'text-zinc-700',
		border: 'border-zinc-200/20',
	},
};

/**
 * NetworkTrigger - Collapsed trigger button showing "Network" with chevron.
 * Used when the dropdown is closed.
 * Dimensions from Figma: 191px x 38px
 */
export function NetworkTrigger({
	isOpen = false,
	theme = 'dark',
	onClick,
	className,
	disabled = false,
}: NetworkTriggerProps) {
	const styles = themeStyles[theme];

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={cn(
				'w-[191px] h-[38px] flex items-center justify-between',
				'px-[15px] py-[10px] rounded-[10px]',
				'border-b-[0.5px] border-solid',
				"font-['Inter',sans-serif] font-medium text-[15px] leading-normal",
				'cursor-pointer transition-colors',
				'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
				'disabled:opacity-50 disabled:cursor-not-allowed',
				styles.bg,
				styles.text,
				styles.border,
				className,
			)}
			aria-expanded={isOpen}
			aria-haspopup="listbox"
		>
			<div className="flex items-center gap-[8px]">
				<Network size={16} className="shrink-0" />
				<span>Network</span>
			</div>
			<ChevronRight
				size={16}
				className={cn('shrink-0 transition-transform duration-200', isOpen && 'rotate-90')}
			/>
		</button>
	);
}
