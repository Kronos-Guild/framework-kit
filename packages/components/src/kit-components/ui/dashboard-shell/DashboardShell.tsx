'use client';

import type React from 'react';
import { cn } from '../../lib/utils';

export interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Color theme */
	theme?: 'light' | 'dark';
	/** Optional header content (navigation, wallet buttons, etc.) */
	header?: React.ReactNode;
	/** Main content */
	children?: React.ReactNode;
	/** Show dot grid background pattern */
	showDotGrid?: boolean;
}

const DOT_GRID_LIGHT =
	'radial-gradient(circle, color-mix(in srgb, var(--color-zinc-700) 7%, transparent) 1px, transparent 1px)';
const DOT_GRID_DARK =
	'radial-gradient(circle, color-mix(in srgb, var(--color-zinc-400) 15%, transparent) 1px, transparent 1px)';

export function DashboardShell({
	theme = 'light',
	header,
	children,
	showDotGrid = true,
	className,
	...props
}: DashboardShellProps) {
	const isDark = theme === 'dark';

	return (
		<div
			className={cn(
				'relative min-h-screen w-full flex flex-col',
				isDark ? 'bg-zinc-900' : 'bg-zinc-100',
				'rounded-3xl',
				className,
			)}
			{...props}
		>
			{showDotGrid && (
				<div
					className="absolute inset-0 rounded-3xl pointer-events-none"
					style={{ backgroundImage: isDark ? DOT_GRID_DARK : DOT_GRID_LIGHT, backgroundSize: '16px 16px' }}
					aria-hidden="true"
				/>
			)}
			{header && <header className="relative z-10 flex items-center justify-between p-4">{header}</header>}
			<main className="relative z-10 flex-1 p-4">{children}</main>
		</div>
	);
}
