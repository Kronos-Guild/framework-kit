'use client';

import { LogOut } from 'lucide-react';
import { useCallback, useState } from 'react';
import { cn, formatSolBalance } from '../../../lib/utils';
import { AddressDisplay } from '../address-display/AddressDisplay';
import { NetworkSwitcher } from '../network-switcher/NetworkSwitcher';
import { ButtonIcon } from './ButtonIcon';
import type { WalletDropdownProps } from './types';

/**
 * Figma design specs (node 210:617):
 *
 * The wallet dropdown has TWO views that swap in-place:
 *
 * VIEW 1 — Wallet info (default)
 * ┌─────────────────────────────┐
 * │ [icon] 6DMh...1DkK  📋     │ address row + copy
 * │        SOL 1.12             │ balance (or *****)
 * ├─────────────────────────────┤ border-top 0.5px
 * │ 🌐 Network              >  │ network trigger row
 * ├─────────────────────────────┤ border-top 0.5px
 * │ ⎋  Disconnect               │ disconnect row
 * └─────────────────────────────┘
 *
 * VIEW 2 — Network selection (swaps in when "Network" is clicked)
 * ┌─────────────────────────────┐
 * │  Network               ∧   │ header → click to go back
 * │ ┌───────────────────────┐   │
 * │ │ Mainnet           🟢  │   │ selected + status
 * │ └───────────────────────┘   │
 * │  Testnet                    │
 * │  Localnet                   │
 * │  Devnet                     │
 * └─────────────────────────────┘
 *
 * Shared specs:
 * - Width: 191px
 * - Border radius: 10px
 * - Padding: 15px horizontal, 10px vertical (rows)
 * - Font: Inter, 14-15px
 * - Dark: bg #3F3F46, text #E4E4E7, hover #52525C
 * - Light: bg #FAFAFA, text #3F3F46, hover rgba(63,63,70,0.05)
 * - Borders: 0.5px solid rgba(228,228,231,0.2) dark / rgba(63,63,70,0.1) light
 */

// ─── Theme tokens (from Figma) ───────────────────────────────
const themes = {
	dark: {
		bg: 'bg-zinc-700',
		text: 'text-zinc-200',
		textMuted: 'text-zinc-200/80',
		border: 'border-zinc-200/20',
		hoverRow: 'hover:bg-zinc-600',
	},
	light: {
		bg: 'bg-zinc-50',
		text: 'text-zinc-700',
		textMuted: 'text-zinc-500',
		border: 'border-zinc-700/10',
		hoverRow: 'hover:bg-zinc-700/5',
	},
} as const;

// ─── Component ───────────────────────────────────────────────

export function WalletDropdown({
	wallet,
	address,
	balance,
	balanceVisible: controlledBalanceVisible,
	balanceLoading = false,
	onToggleBalance,
	onDisconnect,
	onCopyAddress,
	selectedNetwork = 'mainnet-beta',
	networkStatus = 'connected',
	onNetworkChange,
	theme = 'dark',
	className,
	labels,
}: WalletDropdownProps): React.ReactElement {
	// View state: 'wallet' (default) or 'network' (swaps in-place per Figma)
	const [view, setView] = useState<'wallet' | 'network'>('wallet');
	const [internalBalanceVisible, setInternalBalanceVisible] = useState(true);

	const balanceVisible = controlledBalanceVisible ?? internalBalanceVisible;
	const t = themes[theme];

	// ── Handlers ──────────────────────────────────────────────
	const handleToggleBalance = useCallback(() => {
		if (onToggleBalance) {
			onToggleBalance();
		} else {
			setInternalBalanceVisible((prev) => !prev);
		}
	}, [onToggleBalance]);

	const handleNetworkOpenChange = useCallback((open: boolean) => {
		setView(open ? 'network' : 'wallet');
	}, []);

	// ── Derived ───────────────────────────────────────────────
	const formattedBalance = balance !== undefined ? `SOL ${formatSolBalance(balance)}` : null;
	const balanceText = (() => {
		if (balanceLoading) return 'Loading...';
		if (!balanceVisible) return '******';
		return formattedBalance;
	})();
	const disconnectLabel = labels?.disconnect ?? 'Disconnect';

	// Figma: px-15 py-10
	const rowPx = 'px-[15px] py-[10px]';
	// Figma: w-191, rounded-10
	const containerCn = cn('w-[191px] rounded-[10px] overflow-hidden', t.bg, 'shadow-lg', className);

	// ═══════════════════════════════════════════════════════════
	// VIEW 2: Network selection (replaces wallet dropdown in-place)
	// Figma node 210:711 / 210:851
	// Uses the composable NetworkSwitcher in embedded mode
	// ═══════════════════════════════════════════════════════════
	if (view === 'network') {
		return (
			<div className={containerCn} role="menu" aria-label="Select network">
				<div className="p-2">
					<NetworkSwitcher
						variant="embedded"
						selectedNetwork={selectedNetwork}
						status={networkStatus}
						onNetworkChange={onNetworkChange}
						open={true}
						onOpenChange={handleNetworkOpenChange}
						theme={theme}
					/>
				</div>
			</div>
		);
	}

	// ═══════════════════════════════════════════════════════════
	// VIEW 1: Wallet info (default)
	// Figma node 210:630 / 210:775
	// ═══════════════════════════════════════════════════════════
	return (
		<div className={containerCn} role="menu" aria-label="Wallet options">
			{/* ── Row 1: Address + Balance ── */}
			<div className={cn(rowPx, 'border-b-[0.5px]', t.border)}>
				<div className="flex items-center gap-2.5">
					{/* Figma: wallet icon 32px, rounded-20 */}
					<ButtonIcon src={wallet.icon} alt={wallet.name} size={32} className="shrink-0 rounded-4xl" />

					<div className="flex flex-col items-start justify-center gap-0.5">
						{/* Figma: address 14px medium + copy 16px, gap-8 */}
						<AddressDisplay
							address={address}
							variant="inline"
							theme={theme}
							showExplorerLink={false}
							network={selectedNetwork}
							onCopy={onCopyAddress}
							className="text-sm font-medium"
						/>

						{/* Figma: balance 14px light, opacity 80% */}
						{(formattedBalance || balanceLoading) && (
							<button
								type="button"
								onClick={handleToggleBalance}
								disabled={balanceLoading}
								className={cn(
									'text-left text-sm font-light',
									t.textMuted,
									'transition-colors duration-200',
									balanceLoading ? 'cursor-default opacity-60' : 'cursor-pointer hover:opacity-70',
								)}
								aria-label={balanceVisible ? 'Hide balance' : 'Show balance'}
							>
								{balanceText}
							</button>
						)}
					</div>
				</div>
			</div>

			{/* ── Row 2: Network trigger → swaps to network view ── */}
			{/* Uses composable NetworkSwitcher in embedded mode (controlled open state) */}
			<div className={cn('border-b-[0.5px]', t.border)}>
				<NetworkSwitcher
					variant="embedded"
					selectedNetwork={selectedNetwork}
					status={networkStatus}
					onNetworkChange={onNetworkChange}
					open={false}
					onOpenChange={handleNetworkOpenChange}
					theme={theme}
					className={cn(t.hoverRow, 'transition-colors duration-200')}
				/>
			</div>

			{/* ── Row 3: Disconnect ── */}
			<button
				type="button"
				onClick={onDisconnect}
				className={cn(
					'w-full flex items-center gap-2.5',
					rowPx,
					'text-sm font-medium',
					t.text,
					t.hoverRow,
					'transition-colors duration-200 cursor-pointer',
				)}
				role="menuitem"
			>
				<LogOut size={16} className="shrink-0" />
				<span>{disconnectLabel}</span>
			</button>
		</div>
	);
}

/**
 * WalletDropdownWrapper - Wrapper component for positioning dropdown relative to button.
 */
export function WalletDropdownWrapper({
	isOpen,
	children,
	className,
}: {
	isOpen: boolean;
	children: React.ReactNode;
	className?: string;
}): React.ReactElement | null {
	if (!isOpen) return null;

	return <div className={cn('absolute top-full right-0 mt-2 z-50', className)}>{children}</div>;
}
