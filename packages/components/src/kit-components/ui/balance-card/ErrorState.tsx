import { TriangleAlert } from 'lucide-react';
import type React from 'react';
import type { ErrorStateProps } from './types';

/**
 * Error state component for displaying error messages with optional retry
 */
export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry, variant = 'default', className = '' }) => {
	const isDark = variant === 'dark' || variant === 'default';

	const textColor = isDark ? 'text-red-400' : 'text-red-600';
	const linkColor = isDark ? 'text-red-300 hover:text-red-200' : 'text-red-500 hover:text-red-700';

	return (
		<div className={`flex items-center gap-2 ${className}`} role="alert" aria-live="assertive">
			<TriangleAlert size={16} className={textColor} />
			<span className={`text-sm ${textColor}`}>{message}</span>
			{onRetry && (
				<button
					type="button"
					onClick={onRetry}
					className={`text-sm underline ${linkColor} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 rounded`}
				>
					Try again
				</button>
			)}
		</div>
	);
};
