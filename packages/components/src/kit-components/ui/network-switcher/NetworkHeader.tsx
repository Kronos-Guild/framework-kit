'use client';

import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NetworkHeaderProps } from './types';

/**
 * NetworkHeader - Header row inside dropdown with "Network" label and chevron.
 * Dimensions from Figma: 175px (auto from container) x 29px
 */
export function NetworkHeader({ isOpen = true, onClick, className }: NetworkHeaderProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'w-full h-[29px] flex items-center justify-between p-[6px] rounded-[3px]',
				"font-['Inter',sans-serif] font-medium text-[14px] leading-normal",
				'cursor-pointer transition-colors',
				'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				'text-card-foreground',
				className,
			)}
			aria-expanded={isOpen}
		>
			<span>Network</span>
			<ChevronUp size={16} className={cn('transition-transform duration-200', !isOpen && 'rotate-180')} />
		</button>
	);
}
