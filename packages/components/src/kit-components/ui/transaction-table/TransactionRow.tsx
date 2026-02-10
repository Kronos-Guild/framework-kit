import { HelpCircle } from 'lucide-react';
import type React from 'react';
import { truncateAddress } from '../../../lib/utils';
import { cn } from '../../lib/utils';
import receiveIcon from './assets/receive.png';
import sentIcon from './assets/sent.png';
import viewDarkIcon from './assets/view-dark.png';
import viewLightIcon from './assets/view-light.png';
import type { TransactionRowProps } from './types';
import {
	formatFiatAmount,
	formatTokenAmount,
	formatTxDate,
	getBlockTimeSeconds,
	getCounterpartyAddress,
	getPrimaryAmount,
	getTransactionDirection,
} from './utils';

function toCssSize(size: NonNullable<TransactionRowProps['size']>) {
	switch (size) {
		case 'sm':
			return {
				cell: 'py-2 px-4',
				text: 'text-xs',
				muted: 'text-xs',
				typeIcon: 'size-4',
				tokenIcon: 'size-5',
			};
		case 'lg':
			return {
				cell: 'py-3.5 px-5',
				text: 'text-sm',
				muted: 'text-xs',
				typeIcon: 'size-5',
				tokenIcon: 'size-7',
			};
		default:
			return {
				cell: 'py-2.5 px-4',
				text: 'text-sm',
				muted: 'text-xs',
				typeIcon: 'size-4',
				tokenIcon: 'size-6',
			};
	}
}

/**
 * A single row within the TransactionTable, displaying the transaction type,
 * timestamp, counterparty address, token amount, and an optional action button.
 *
 * @example
 * ```tsx
 * <TransactionRow
 *   tx={classifiedTransaction}
 *   walletAddress="6DMh...1DkK"
 *   onViewTransaction={(tx) => openExplorer(tx.tx.signature)}
 * />
 * ```
 */
export const TransactionRow: React.FC<TransactionRowProps> = ({
	tx,
	walletAddress,
	theme = 'dark',
	size = 'md',
	locale = 'en-US',
	onViewTransaction,
	renderRowAction,
	className,
}) => {
	const isDark = theme === 'dark';
	const css = toCssSize(size);

	const direction = getTransactionDirection(tx, walletAddress);
	const typeLabel = direction === 'sent' ? 'Sent' : direction === 'received' ? 'Received' : 'Other';
	const typeTextColor = isDark ? 'text-zinc-50' : 'text-zinc-900';

	const counterparty = getCounterpartyAddress(tx, walletAddress);
	const displayAddress = counterparty ? truncateAddress(counterparty) : '—';

	const primaryAmount = getPrimaryAmount(tx);
	const tokenSymbol = primaryAmount?.token?.symbol ?? '';
	const tokenLogoUrl = primaryAmount?.token?.logoURI ?? undefined;
	const amountText = primaryAmount?.amountUi !== undefined ? formatTokenAmount(primaryAmount.amountUi, locale) : '—';

	const fiatCurrency = primaryAmount?.fiat?.currency ?? 'USD';
	const fiatText =
		primaryAmount?.fiat?.amount !== undefined
			? formatFiatAmount(primaryAmount.fiat.amount, fiatCurrency, locale)
			: null;

	const timeText = formatTxDate(getBlockTimeSeconds(tx), locale);

	const rowStyles = cn(
		'group grid grid-cols-4 items-center gap-6 border-b transition-colors',
		css.cell,
		isDark ? 'border-zinc-700 hover:bg-zinc-700' : 'border-zinc-200 hover:bg-zinc-50',
		className,
	);

	const headerText = isDark ? 'text-zinc-50' : 'text-zinc-900';
	const mutedText = isDark ? 'text-zinc-400' : 'text-zinc-500';

	return (
		<div className={rowStyles}>
			{/* Type */}
			<div className={cn('flex items-center gap-2 min-w-0', css.text, headerText)}>
				{direction === 'sent' || direction === 'received' ? (
					<img
						src={direction === 'sent' ? sentIcon : receiveIcon}
						alt=""
						aria-hidden="true"
						className={cn(css.typeIcon, 'shrink-0')}
					/>
				) : (
					<HelpCircle
						className={cn(css.typeIcon, 'shrink-0', isDark ? 'text-zinc-400' : 'text-zinc-500')}
						aria-hidden="true"
					/>
				)}
				<span className={cn('truncate', typeTextColor)}>{typeLabel}</span>
			</div>

			{/* Time */}
			<div className={cn('min-w-0', css.text, headerText)}>
				<span className="truncate">{timeText}</span>
			</div>

			{/* Address */}
			<div className={cn('min-w-0', css.text, headerText)}>
				<span className={cn('font-mono truncate')}>{displayAddress}</span>
			</div>

			{/* Amount */}
			<div className="flex items-center justify-between gap-2 min-w-0">
				<div className="flex items-center gap-2 min-w-0">
					{tokenLogoUrl ? (
						<img
							src={tokenLogoUrl}
							alt={tokenSymbol ? `${tokenSymbol} token` : 'Token'}
							className={cn(css.tokenIcon, 'shrink-0 rounded-full')}
						/>
					) : (
						<div
							className={cn(
								css.tokenIcon,
								'shrink-0 rounded-full',
								isDark ? 'bg-zinc-700' : 'bg-zinc-200',
							)}
							aria-hidden="true"
						/>
					)}
					<div className="min-w-0">
						<div className={cn('truncate', css.text, headerText)}>
							{amountText}
							{tokenSymbol ? ` ${tokenSymbol}` : ''}
						</div>
						{fiatText ? <div className={cn('truncate', css.muted, mutedText)}>{fiatText}</div> : null}
					</div>
				</div>
				{renderRowAction ? (
					<div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
						{renderRowAction(tx)}
					</div>
				) : onViewTransaction ? (
					<button
						type="button"
						onClick={() => onViewTransaction(tx)}
						className="shrink-0 inline-flex items-center justify-center rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity"
						aria-label="View transaction"
					>
						<img src={isDark ? viewDarkIcon : viewLightIcon} alt="" aria-hidden="true" className="size-4" />
					</button>
				) : null}
			</div>
		</div>
	);
};
