import type React from 'react';
import { AddressDisplay } from '../address-display/AddressDisplay';
import walletIconDark from './assets/wallet-icon-dark.png';
import walletIconLight from './assets/wallet-icon-light.png';
import { BalanceAmount } from './BalanceAmount';
import { BalanceCardSkeleton } from './BalanceCardSkeleton';
import { ErrorState } from './ErrorState';
import { TokenList } from './TokenList';
import type { BalanceCardProps } from './types';

/**
 * A comprehensive balance card component for displaying wallet balances
 * with support for token lists, loading states, and error handling.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <BalanceCard
 *   walletAddress="6DMh...1DkK"
 *   totalBalance={34.81}
 *   isFiatBalance
 * />
 *
 * // With token list
 * <BalanceCard
 *   walletAddress="6DMh...1DkK"
 *   totalBalance={34.81}
 *   isFiatBalance
 *   tokens={[
 *     { symbol: 'USDC', balance: 15.50, fiatValue: 15.50 },
 *     { symbol: 'USDT', balance: 10.18, fiatValue: 10.18 },
 *   ]}
 * />
 * ```
 */
export const BalanceCard: React.FC<BalanceCardProps> = ({
	walletAddress,
	totalBalance,
	tokenDecimals = 9,
	isFiatBalance = true,
	currency = 'USD',
	displayDecimals = 2,
	tokens = [],
	isLoading = false,
	error,
	onRetry,
	onCopyAddress,
	defaultExpanded = false,
	isExpanded: controlledExpanded,
	onExpandedChange,
	variant = 'default',
	size = 'md',
	className = '',
	locale = 'en-US',
}) => {
	// Show skeleton during loading
	if (isLoading) {
		return <BalanceCardSkeleton variant={variant} size={size} className={className} />;
	}

	const isDark = variant === 'dark' || variant === 'default';

	const cardStyles = isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-zinc-200 text-zinc-900';

	const labelColor = isDark ? 'text-zinc-400' : 'text-zinc-500';

	const paddingStyles = {
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-6',
	}[size];

	const errorMessage = error ? (typeof error === 'string' ? error : error.message || 'An error occurred') : null;

	return (
		<section
			className={`rounded-xl border ${cardStyles} ${paddingStyles} ${className}`}
			aria-label={walletAddress ? `Wallet balance for ${walletAddress}` : 'Wallet balance'}
		>
			{/* Wallet address */}
			{walletAddress && (
				<div className="flex items-center gap-2 mb-4">
					<img
						src={isDark ? walletIconDark : walletIconLight}
						alt=""
						className="w-5 h-5"
						aria-hidden="true"
					/>
					<AddressDisplay
						address={walletAddress}
						onCopy={onCopyAddress ? () => onCopyAddress(walletAddress) : undefined}
						theme={isDark ? 'dark' : 'light'}
						showExplorerLink={false}
						className="[&>span]:bg-transparent! [&>span]:p-0! [&>span]:rounded-none!"
					/>
				</div>
			)}

			{/* Balance label */}
			<div className={`text-xs ${labelColor} mb-1`}>Total balance</div>

			{/* Balance amount */}
			<BalanceAmount
				balance={totalBalance}
				tokenDecimals={tokenDecimals}
				isFiat={isFiatBalance}
				currency={currency}
				displayDecimals={displayDecimals}
				locale={locale}
				size={size}
				variant={variant}
				className="mb-3"
			/>

			{/* Error state */}
			{errorMessage && <ErrorState message={errorMessage} onRetry={onRetry} variant={variant} className="mb-3" />}

			{/* Token list */}
			<TokenList
				tokens={tokens}
				isExpanded={controlledExpanded ?? (defaultExpanded ? true : undefined)}
				onExpandedChange={onExpandedChange}
				variant={variant}
				locale={locale}
				currency={currency}
			/>
		</section>
	);
};
