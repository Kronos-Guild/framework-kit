import type React from 'react';
import { useRef } from 'react';
import { cn } from '../../lib/utils';
import { Skeleton } from '../skeleton/Skeleton';
import type { TransactionTableSkeletonProps } from './types';

function toCssSize(size: NonNullable<TransactionTableSkeletonProps['size']>) {
	switch (size) {
		case 'sm':
			return {
				row: 'py-2 px-4',
				icon: 'size-4',
				token: 'size-5',
			};
		case 'lg':
			return {
				row: 'py-3.5 px-5',
				icon: 'size-5',
				token: 'size-7',
			};
		default:
			return {
				row: 'py-2.5 px-4',
				icon: 'size-4',
				token: 'size-6',
			};
	}
}

/**
 * Skeleton loading state for the TransactionTable component.
 *
 * @example
 * ```tsx
 * <TransactionTableSkeleton theme="dark" rowCount={5} />
 * ```
 */
export const TransactionTableSkeleton: React.FC<TransactionTableSkeletonProps> = ({
	theme = 'dark',
	size = 'md',
	rowCount = 4,
	className,
}) => {
	const isDark = theme === 'dark';
	const css = toCssSize(size);
	const keysRef = useRef<string[]>([]);
	if (keysRef.current.length !== rowCount) {
		const next: string[] = [];
		for (let i = 0; i < rowCount; i++) {
			next.push(
				keysRef.current[i] ?? globalThis.crypto?.randomUUID?.() ?? `row-${Math.random().toString(36).slice(2)}`,
			);
		}
		keysRef.current = next;
	}

	const borderColor = isDark ? 'border-zinc-700' : 'border-zinc-200';

	return (
		<output className={cn('divide-y', borderColor, className)} aria-label="Loading transactions">
			{keysRef.current.map((key) => (
				<div key={key} className={cn('grid grid-cols-4 items-center gap-6', css.row)}>
					{/* Type */}
					<div className="flex items-center gap-3 min-w-0">
						<Skeleton theme={theme} className={cn(css.icon, 'rounded-full')} />
						<Skeleton theme={theme} className="h-4 w-20" />
					</div>
					{/* Time */}
					<Skeleton theme={theme} className="h-4 w-28" />
					{/* Address */}
					<Skeleton theme={theme} className="h-4 w-32" />
					{/* Amount */}
					<div className="flex items-center gap-2 min-w-0">
						<Skeleton theme={theme} className={cn(css.token, 'rounded-full')} />
						<div className="min-w-0">
							<Skeleton theme={theme} className="h-3.5 w-20" />
							<Skeleton theme={theme} className="mt-1.5 h-3 w-14" />
						</div>
					</div>
				</div>
			))}
		</output>
	);
};
