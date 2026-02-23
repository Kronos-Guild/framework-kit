import { ArrowDownUp } from 'lucide-react';
import type React from 'react';
import { cn } from '@/lib/utils';
import { SwapInputSkeleton } from './SwapInputSkeleton';
import { TokenInput } from './TokenInput';
import type { SwapInputProps } from './types';
import { isInsufficientBalance } from './utils';

/**
 * A swap input widget for exchanging tokens on Solana.
 * Composes two TokenInput cards (Pay and Receive) with a swap direction
 * button between them. Handles "insufficient balance" validation automatically.
 *
 * @example
 * ```tsx
 * <SwapInput
 *   payAmount={payAmount}
 *   onPayAmountChange={setPayAmount}
 *   receiveAmount={receiveAmount}
 *   payToken={{ symbol: 'SOL', icon: solIcon }}
 *   receiveToken={{ symbol: 'USDC', icon: usdcIcon }}
 *   onSwapDirection={handleSwap}
 *   payBalance="4.32"
 *   variant="dark"
 * />
 * ```
 */
export const SwapInput: React.FC<SwapInputProps> = ({
	payAmount,
	onPayAmountChange,
	receiveAmount,
	onReceiveAmountChange,
	payToken,
	onPayTokenSelect,
	receiveToken,
	onReceiveTokenSelect,
	onSwapDirection,
	payBalance,
	receiveReadOnly = true,
	isLoading = false,
	isSwapping = false,
	variant = 'default',
	size = 'md',
	className,
	disabled = false,
}) => {
	if (isLoading) {
		return <SwapInputSkeleton variant={variant} size={size} className={className} />;
	}

	const isDark = variant === 'dark' || variant === 'default';

	const insufficientBalance = isInsufficientBalance(payAmount, payBalance);
	const payError = insufficientBalance ? 'Insufficient balance' : undefined;

	const swapBtnBg = isDark ? 'bg-zinc-700 hover:bg-zinc-600' : 'bg-zinc-200 hover:bg-zinc-300';
	const swapBtnBorder = isDark ? 'border-zinc-900' : 'border-zinc-50';
	const swapBtnIconColor = isDark ? 'text-zinc-100' : 'text-zinc-600';
	const swapBtnFocus = cn(
		'focus:outline-none focus:ring-2 focus:ring-offset-2',
		isDark ? 'focus:ring-zinc-200/20 focus:ring-offset-zinc-900' : 'focus:ring-zinc-900/15 focus:ring-offset-white',
	);

	return (
		<section className={cn('relative', className)} aria-label="Swap input">
			<div className="relative flex flex-col gap-1">
				{/* Pay card */}
				<TokenInput
					label="Pay"
					amount={payAmount}
					onAmountChange={disabled ? undefined : onPayAmountChange}
					token={payToken}
					onTokenSelect={disabled ? undefined : onPayTokenSelect}
					balance={payBalance}
					readOnly={disabled}
					error={payError}
					variant={variant}
					size={size}
				/>

				{/* Swap direction button */}
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
					<button
						type="button"
						onClick={onSwapDirection}
						disabled={disabled || isSwapping}
						className={cn(
							'flex items-center justify-center w-9 h-9 rounded-full border-4 transition-colors',
							swapBtnBg,
							swapBtnBorder,
							swapBtnFocus,
							(disabled || isSwapping) && 'opacity-50 cursor-not-allowed',
						)}
						aria-label="Swap pay and receive tokens"
					>
						<ArrowDownUp size={16} className={swapBtnIconColor} aria-hidden="true" />
					</button>
				</div>

				{/* Receive card */}
				<TokenInput
					label="Receive"
					amount={receiveAmount}
					onAmountChange={disabled ? undefined : onReceiveAmountChange}
					token={receiveToken}
					onTokenSelect={disabled ? undefined : onReceiveTokenSelect}
					readOnly={receiveReadOnly}
					variant={variant}
					size={size}
				/>
			</div>
		</section>
	);
};
