import type React from 'react';
import { cn } from '../../lib/utils';
import { Skeleton } from '../skeleton/Skeleton';
import type { SwapInputSkeletonProps } from './types';

/**
 * Loading skeleton for the SwapInput component.
 * Renders two placeholder cards with a swap button between them.
 */
export const SwapInputSkeleton: React.FC<SwapInputSkeletonProps> = ({
	variant = 'default',
	size = 'md',
	className,
}) => {
	const isDark = variant === 'dark' || variant === 'default';
	const skeletonTheme = isDark ? 'dark' : 'light';

	const cardBg = isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200';
	const swapBtnBg = isDark ? 'bg-zinc-700' : 'bg-zinc-200';
	const swapBtnBorder = isDark ? 'border-zinc-900' : 'border-zinc-50';
	const paddingStyles = { sm: 'p-3', md: 'p-4', lg: 'p-5' }[size];

	const renderCard = () => (
		<div className={cn('rounded-xl border', cardBg, paddingStyles)}>
			<Skeleton theme={skeletonTheme} className="h-3 w-12 mb-3" />
			<div className="flex items-center justify-between gap-3">
				<Skeleton theme={skeletonTheme} className="h-8 w-32" />
				<Skeleton theme={skeletonTheme} className="h-9 w-24 rounded-lg" />
			</div>
			<Skeleton theme={skeletonTheme} className="h-3 w-20 mt-2" />
		</div>
	);

	return (
		<output className={cn('block', className)} aria-label="Loading swap input">
			<div className="relative flex flex-col gap-1">
				{renderCard()}
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
					<div className={cn('w-9 h-9 rounded-full border-4', swapBtnBg, swapBtnBorder)} />
				</div>
				{renderCard()}
			</div>
		</output>
	);
};
