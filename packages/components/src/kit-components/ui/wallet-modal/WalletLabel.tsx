import { cn } from '../../../lib/utils';
import type { WalletLabelType, WalletModalTheme } from './types';

export interface WalletLabelProps {
	/** The label type to display */
	type: WalletLabelType;
	/** Theme variant */
	theme?: WalletModalTheme;
	/** Additional class names */
	className?: string;
}

const labelText: Record<WalletLabelType, string> = {
	recent: 'Recent',
	detected: 'Detected',
	installed: 'Installed',
};

/**
 * WalletLabel - Badge component for wallet status (Recent, Detected, etc.)
 *
 * @example
 * ```tsx
 * <WalletLabel type="recent" theme="dark" />
 * <WalletLabel type="detected" theme="light" />
 * ```
 */
export function WalletLabel({ type, theme = 'dark', className }: WalletLabelProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center justify-center px-1.5 py-0.5 rounded-[3px] text-xs font-normal',
				// Dark theme
				theme === 'dark' && ['bg-zinc-600/60', 'text-zinc-200 opacity-90'],
				// Light theme
				theme === 'light' && ['bg-zinc-100', 'text-zinc-700/90'],
				className,
			)}
		>
			{labelText[type]}
		</span>
	);
}
