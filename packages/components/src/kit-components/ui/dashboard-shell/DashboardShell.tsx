import type React from 'react';
import { cn } from '../../lib/utils';

export interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
	//slot for shell color theme
	theme?: 'light' | 'dark';
	// slot for optional header content like nav, wallet buttons, etc
	header?: React.ReactNode;
	//main content slot
	children?: React.ReactNode;
	//slot for showing the dot grid background pattern
	showDotGrid?: boolean;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({
	theme = 'light',
	header,
	children,
	showDotGrid = true,
	className,
	...props
}) => {
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
			{/* dot grid background pattern if enabled */}
			{showDotGrid && (
				<div
					className="absolute inset-0 rounded-3xl pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(161, 161, 170, 0.15)' : 'rgba(63, 63, 70, 0.07)'} 1px, transparent 1px)`,
						backgroundSize: '16px 16px',
					}}
					aria-hidden="true"
				/>
			)}
			{/* header slot */}
			{header && <header className="relative z-10 flex items-center justify-between p-4">{header}</header>}
			{/* main content slot */}
			<main className="relative z-10 flex-1 p-4">{children}</main>
		</div>
	);
};
