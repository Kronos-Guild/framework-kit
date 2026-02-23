import type { Lamports } from '@solana/kit';
import { BalanceCard } from 'components/src/kit-components/ui/balance-card';
import { ConnectWalletButton } from 'components/src/kit-components/ui/connect-wallet-button';
import { DashboardShell } from 'components/src/kit-components/ui/dashboard-shell';
import { NetworkSwitcher } from 'components/src/kit-components/ui/network-switcher';
import { Skeleton } from 'components/src/kit-components/ui/skeleton';
import { SwapInput } from 'components/src/kit-components/ui/swap-input';
import { TransactionToast } from 'components/src/kit-components/ui/transaction-toast';
import { MOCK_TOKENS, SOL_TOKEN, SWAP_TOKEN_LIST, USDC_TOKEN } from '../mocks/tokens';
import { MOCK_WALLET_ADDRESS } from '../mocks/wallet';

const MOCK_SIG = '5xG7abcCustomThemeMockSignature11111111111';

function ThemeColumn({ label, className }: { label: string; className?: string }) {
	return (
		<div className={className}>
			<h3 className="mb-4 text-lg font-semibold text-foreground">{label}</h3>
			<div className="space-y-6">
				{/* Skeleton */}
				<div className="space-y-2">
					<p className="text-xs text-muted-foreground">Skeleton</p>
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>

				{/* NetworkSwitcher */}
				<div className="space-y-2">
					<p className="text-xs text-muted-foreground">NetworkSwitcher</p>
					<NetworkSwitcher selectedNetwork="devnet" status="connected" />
				</div>

				{/* ConnectWalletButton */}
				<div className="space-y-2">
					<p className="text-xs text-muted-foreground">ConnectWalletButton</p>
					<ConnectWalletButton
						status="connected"
						wallet={{ address: MOCK_WALLET_ADDRESS }}
						currentConnector={{ id: 'phantom', name: 'Phantom' }}
						balance={4_500_000_000n as Lamports}
						onDisconnect={() => {}}
					/>
				</div>

				{/* BalanceCard */}
				<div className="space-y-2">
					<p className="text-xs text-muted-foreground">BalanceCard</p>
					<BalanceCard
						walletAddress={MOCK_WALLET_ADDRESS}
						totalBalance={4_500_000_000n as Lamports}
						tokenSymbol="SOL"
						tokens={MOCK_TOKENS}
						size="sm"
					/>
				</div>

				{/* SwapInput */}
				<div className="space-y-2">
					<p className="text-xs text-muted-foreground">SwapInput</p>
					<SwapInput
						payAmount="1.5"
						onPayAmountChange={() => {}}
						receiveAmount="199.50"
						onReceiveAmountChange={() => {}}
						payToken={SOL_TOKEN}
						receiveToken={USDC_TOKEN}
						payTokens={SWAP_TOKEN_LIST}
						receiveTokens={SWAP_TOKEN_LIST}
						payBalance="4.5"
						size="sm"
					/>
				</div>

				{/* TransactionToast */}
				<div className="space-y-2">
					<p className="text-xs text-muted-foreground">TransactionToast</p>
					<div className="space-y-2">
						<TransactionToast signature={MOCK_SIG} status="success" type="sent" />
						<TransactionToast signature={MOCK_SIG} status="error" type="swapped" />
					</div>
				</div>

				{/* DashboardShell */}
				<div className="space-y-2">
					<p className="text-xs text-muted-foreground">DashboardShell</p>
					<DashboardShell header={<span className="text-sm font-medium text-foreground">Header</span>}>
						<div className="p-4 text-center text-sm text-muted-foreground">Content area</div>
					</DashboardShell>
				</div>
			</div>
		</div>
	);
}

export function CustomTheme() {
	return (
		<div className="space-y-8">
			<div>
				<h2 className="mb-2 text-2xl font-bold text-foreground">Custom Theme</h2>
				<p className="text-sm text-muted-foreground">
					Same components, zero code changes — pure CSS variable swap. Left uses default tokens, right uses a
					purple/indigo palette via{' '}
					<code className="rounded bg-muted px-1 py-0.5 text-xs">.custom-theme</code>.
				</p>
			</div>

			<div className="grid gap-8 lg:grid-cols-2">
				{/* Default theme */}
				<div className="rounded-xl border border-border bg-card p-6">
					<ThemeColumn label="Default Theme" />
				</div>

				{/* Custom theme (purple overrides) */}
				<div className="custom-theme rounded-xl border border-border bg-background p-6">
					<ThemeColumn label="Custom Theme (Purple)" className="text-foreground" />
				</div>
			</div>

			{/* className override demo */}
			<div className="rounded-xl border border-border bg-card p-6">
				<h3 className="mb-4 text-lg font-semibold text-foreground">className Overrides</h3>
				<p className="mb-4 text-sm text-muted-foreground">
					Components accept className for ad-hoc styling without touching CSS variables.
				</p>
				<div className="grid gap-4 sm:grid-cols-3">
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">Default border-radius</p>
						<BalanceCard
							totalBalance={1_000_000_000n as Lamports}
							tokenSymbol="SOL"
							tokens={[]}
							size="sm"
						/>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">className="rounded-none"</p>
						<BalanceCard
							totalBalance={1_000_000_000n as Lamports}
							tokenSymbol="SOL"
							tokens={[]}
							size="sm"
							className="rounded-none"
						/>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">className="rounded-3xl"</p>
						<BalanceCard
							totalBalance={1_000_000_000n as Lamports}
							tokenSymbol="SOL"
							tokens={[]}
							size="sm"
							className="rounded-3xl"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
