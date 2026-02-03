import type React from 'react';
import { cn } from '../../lib/utils';

//add props interface
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	// color theme
	theme?: 'light' | 'dark';
}

//add component
export const Skeleton: React.FC<SkeletonProps> = ({ className, theme = 'light', ...props }) => {
	const isDark = theme === 'dark';
	return (
		<div
			className={cn(
				'animate-pulse rounded-md', //base styles
				isDark ? 'bg-zinc-700' : 'bg-zinc-200', //theme styles
				className, //the custom classes of the user
			)}
			{...props}
		/>
	);
};
