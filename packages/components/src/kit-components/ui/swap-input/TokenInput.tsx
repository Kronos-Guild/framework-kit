import { ChevronDown } from 'lucide-react';
import type React from 'react';
import { useCallback } from 'react';
import { cn } from '../../lib/utils';
import { Skeleton } from '../skeleton/Skeleton';
import type { TokenInputProps } from './types';
import { sanitizeAmountInput } from './utils';

function toCssSize(size: NonNullable<TokenInputProps['size']>) {
	switch (size) {
		case 'sm':
			return { padding: 'p-3', inputText: 'text-xl', tokenIcon: 'size-5' };
		case 'lg':
			return { padding: 'p-5', inputText: 'text-3xl', tokenIcon: 'size-7' };
		default:
			return { padding: 'p-4', inputText: 'text-2xl', tokenIcon: 'size-6' };
	}
}

/**
 * A single token input card for either the "Pay" or "Receive" side of a swap.
 * Displays a label, numeric amount input, token selector button, and optional balance.
 *
 * @example
 * ```tsx
 * <TokenInput
 *   label="Pay"
 *   amount="1.21"
 *   onAmountChange={setAmount}
 *   token={{ symbol: 'SOL', logoURI: 'https://...' }}
 *   balance="4.32"
 *   variant="dark"
 * />
 * ```
 */
export const TokenInput: React.FC<TokenInputProps> = ({
	label,
	amount,
	onAmountChange,
	token,
	onTokenSelect,
	balance,
	readOnly = false,
	isLoading = false,
	error,
	variant = 'default',
	size = 'md',
	className,
	placeholder = '0.00',
}) => {
	const isDark = variant === 'dark' || variant === 'default';
	const css = toCssSize(size);

	const handleAmountChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const sanitized = sanitizeAmountInput(e.target.value);
			if (sanitized !== null && onAmountChange) {
				onAmountChange(sanitized);
			}
		},
		[onAmountChange],
	);

	const cardStyles = cn(
		'rounded-xl border',
		isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200',
		css.padding,
		className,
	);

	const labelColor = isDark ? 'text-zinc-400' : 'text-zinc-500';
	const inputTextColor = isDark ? 'text-white' : 'text-zinc-900';
	const balanceLabelColor = isDark ? 'text-zinc-400' : 'text-zinc-500';
	const balanceValueColor = isDark ? 'text-zinc-200' : 'text-zinc-700';
	const errorColor = isDark ? 'text-red-400' : 'text-red-600';
	const tokenSelectorBg = isDark ? 'bg-zinc-700 hover:bg-zinc-600' : 'bg-zinc-100 hover:bg-zinc-200';
	const tokenSelectorText = isDark ? 'text-zinc-50' : 'text-zinc-700';
	const chevronColor = isDark ? 'text-zinc-100' : 'text-zinc-500';
	const skeletonTheme = isDark ? 'dark' : 'light';

	const tokenSelectorFocus = cn(
		'focus:outline-none focus:ring-2 focus:ring-offset-2',
		isDark ? 'focus:ring-zinc-200/20 focus:ring-offset-zinc-800' : 'focus:ring-zinc-900/15 focus:ring-offset-white',
	);

	return (
		<div className={cardStyles}>
			{/* Label */}
			<div className={cn('text-xs font-medium mb-2', labelColor)}>{label}</div>

			{/* Input + token selector row */}
			<div className="flex items-center justify-between gap-3">
				{/* Amount input or skeleton */}
				{isLoading ? (
					<Skeleton theme={skeletonTheme} className="h-8 w-32" />
				) : (
					<input
						type="text"
						inputMode="decimal"
						value={amount}
						onChange={handleAmountChange}
						readOnly={readOnly}
						placeholder={placeholder}
						className={cn(
							'bg-transparent border-none outline-none w-full min-w-0 font-semibold',
							css.inputText,
							inputTextColor,
							readOnly && 'cursor-default',
							'placeholder:text-zinc-500',
						)}
						aria-label={`${label} amount`}
					/>
				)}

				{/* Token selector button */}
				{isLoading ? (
					<Skeleton theme={skeletonTheme} className="h-9 w-24 rounded-lg" />
				) : token ? (
					<button
						type="button"
						onClick={onTokenSelect}
						className={cn(
							'flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors shrink-0',
							tokenSelectorBg,
							tokenSelectorText,
							tokenSelectorFocus,
						)}
						aria-label={`Select ${label.toLowerCase()} token, currently ${token.symbol}`}
					>
						{token.logoURI ? (
							<img
								src={token.logoURI}
								alt={`${token.symbol} token`}
								className={cn(css.tokenIcon, 'shrink-0 rounded-full')}
							/>
						) : (
							<div
								className={cn(
									css.tokenIcon,
									'shrink-0 rounded-full',
									isDark ? 'bg-zinc-600' : 'bg-zinc-300',
								)}
								aria-hidden="true"
							/>
						)}
						<span className="text-sm font-medium">{token.symbol}</span>
						<ChevronDown size={16} className={cn('shrink-0', chevronColor)} aria-hidden="true" />
					</button>
				) : (
					<button
						type="button"
						onClick={onTokenSelect}
						className={cn(
							'flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors shrink-0',
							tokenSelectorBg,
							tokenSelectorText,
							tokenSelectorFocus,
						)}
						aria-label={`Select ${label.toLowerCase()} token`}
					>
						<span className="text-sm font-medium">Select token</span>
						<ChevronDown size={16} className={cn('shrink-0', chevronColor)} aria-hidden="true" />
					</button>
				)}
			</div>

			{/* Balance + error row */}
			{(balance !== undefined || error) && (
				<div className="flex items-center justify-between mt-2">
					{balance !== undefined ? (
						<span className="text-xs">
							<span className={balanceLabelColor}>Balance </span>
							<span className={balanceValueColor}>{balance}</span>
						</span>
					) : (
						<span />
					)}

					{error && (
						<span className={cn('text-xs', errorColor)} role="alert">
							{error}
						</span>
					)}
				</div>
			)}
		</div>
	);
};
