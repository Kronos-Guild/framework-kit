import type React from 'react';
import type { BalanceCardSkeletonProps } from './types';

/**
 * Skeleton loading state for the BalanceCard component
 */
export const BalanceCardSkeleton: React.FC<BalanceCardSkeletonProps> = ({
	variant = 'default',
	size = 'md',
	className = '',
}) => {
	const isDark = variant === 'dark' || variant === 'default';

	const baseStyles = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200';

	const skeletonBg = isDark ? 'bg-zinc-800' : 'bg-zinc-200';

	const paddingStyles = {
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-6',
	}[size];

	return (
		<output
			className={`block rounded-xl border ${baseStyles} ${paddingStyles} ${className}`}
			aria-label="Loading balance"
		>
			{/* Header skeleton - address area */}
			<div className="flex items-center gap-2 mb-4">
				<div className={`w-5 h-5 rounded ${skeletonBg} animate-pulse`} />
				<div className={`h-4 w-24 rounded ${skeletonBg} animate-pulse`} />
				<div className={`w-4 h-4 rounded ${skeletonBg} animate-pulse`} />
			</div>

			{/* Label skeleton */}
			<div className={`h-3 w-20 rounded ${skeletonBg} animate-pulse mb-2`} />

			{/* Balance skeleton */}
			<div className={`h-8 w-32 rounded ${skeletonBg} animate-pulse mb-4`} />

			{/* View all tokens skeleton */}
			<div className="flex items-center justify-between pt-3 border-t border-inherit">
				<div className={`h-4 w-24 rounded ${skeletonBg} animate-pulse`} />
				<div className={`w-5 h-5 rounded ${skeletonBg} animate-pulse`} />
			</div>
		</output>
	);
};
