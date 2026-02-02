import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with proper conflict resolution.
 * Combines clsx for conditional classes and tailwind-merge for deduplication.
 *
 * @example
 * cn("px-4 py-2", isDark && "bg-black", className)
 * // Resolves conflicts: cn("px-4", "px-2") => "px-2"
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
