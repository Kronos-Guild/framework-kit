import type { Lamports } from '@solana/kit';
import { BalanceAmount, BalanceCard, TokenList } from 'components/src/kit-components/ui/balance-card';
import { WalletButton } from 'components/src/kit-components/ui/connect-wallet-button';
import { NetworkSwitcher, NetworkTrigger, StatusIndicator } from 'components/src/kit-components/ui/network-switcher';
import { Skeleton } from 'components/src/kit-components/ui/skeleton';
import { TokenInput } from 'components/src/kit-components/ui/swap-input';
import { MOCK_TOKENS, SOL_TOKEN } from '../mocks/tokens';

export function Customization() {
	return (
		<div className="space-y-8">
			<div>
				<h2 className="mb-2 text-2xl font-bold text-foreground">Customization</h2>
				<p className="text-sm text-muted-foreground">
					Three levels of customization: sub-component composition, className overrides, and CSS token
					theming.
				</p>
			</div>

			{/* Card 1: Sub-component Composition */}
			<div className="rounded-xl border border-border bg-card p-6">
				<h3 className="mb-2 text-lg font-semibold text-foreground">Sub-component Composition</h3>
				<p className="mb-6 text-sm text-muted-foreground">
					Import sub-components individually to build custom layouts without parent wrappers.
				</p>

				<div className="grid gap-6 md:grid-cols-2">
					{/* Custom portfolio card from BalanceAmount + TokenList */}
					<div className="space-y-2">
						<p className="text-xs font-medium text-muted-foreground">
							Custom card from BalanceAmount + TokenList
						</p>
						<div className="rounded-lg border border-border bg-card p-4">
							<p className="mb-1 text-xs text-muted-foreground">Portfolio Value</p>
							<BalanceAmount balance={4_500_000_000n} tokenSymbol="SOL" size="lg" />
							<div className="mt-3">
								<TokenList tokens={MOCK_TOKENS} defaultExpanded />
							</div>
						</div>
					</div>

					{/* Standalone WalletButton */}
					<div className="space-y-2">
						<p className="text-xs font-medium text-muted-foreground">
							WalletButton standalone with custom children
						</p>
						<div className="flex flex-col gap-3">
							<WalletButton connectionState="disconnected">Launch Wallet</WalletButton>
							<WalletButton connectionState="connecting">Connecting...</WalletButton>
						</div>
					</div>

					{/* NetworkTrigger + StatusIndicator standalone */}
					<div className="space-y-2">
						<p className="text-xs font-medium text-muted-foreground">
							NetworkTrigger + StatusIndicator standalone
						</p>
						<div className="flex items-center gap-4">
							<NetworkTrigger selectedLabel="Devnet" status="connected" />
							<div className="flex items-center gap-2">
								<StatusIndicator status="connected" />
								<span className="text-xs text-muted-foreground">Connected</span>
							</div>
							<div className="flex items-center gap-2">
								<StatusIndicator status="connecting" />
								<span className="text-xs text-muted-foreground">Connecting</span>
							</div>
							<div className="flex items-center gap-2">
								<StatusIndicator status="error" />
								<span className="text-xs text-muted-foreground">Error</span>
							</div>
						</div>
					</div>

					{/* TokenInput standalone for a "Send" flow */}
					<div className="space-y-2">
						<p className="text-xs font-medium text-muted-foreground">TokenInput standalone (Send flow)</p>
						<TokenInput
							label="Send"
							amount="2.5"
							token={SOL_TOKEN}
							balance="4.5"
							onAmountChange={() => {}}
						/>
					</div>
				</div>
			</div>

			{/* Card 2: className Overrides */}
			<div className="rounded-xl border border-border bg-card p-6">
				<h3 className="mb-2 text-lg font-semibold text-foreground">className Overrides</h3>
				<p className="mb-6 text-sm text-muted-foreground">
					Classes are merged via tailwind-merge — your overrides always win over defaults.
				</p>

				<div className="grid gap-6 md:grid-cols-3">
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
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">className="shadow-xl border-0"</p>
						<BalanceCard
							totalBalance={1_000_000_000n as Lamports}
							tokenSymbol="SOL"
							tokens={[]}
							size="sm"
							className="shadow-xl border-0"
						/>
					</div>
				</div>

				<div className="mt-6 grid gap-6 md:grid-cols-2">
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">WalletButton className="rounded-full"</p>
						<WalletButton connectionState="disconnected" className="rounded-full">
							Connect Wallet
						</WalletButton>
					</div>
					<div className="space-y-2">
						<p className="text-xs text-muted-foreground">Skeleton className="bg-primary/20"</p>
						<Skeleton className="h-4 w-full bg-primary/20" />
						<Skeleton className="h-4 w-3/4 bg-primary/20" />
						<Skeleton className="h-4 w-1/2 bg-primary/20" />
					</div>
				</div>
			</div>

			{/* Card 3: CSS Token Theming (green/teal palette) */}
			<div className="rounded-xl border border-border bg-card p-6">
				<h3 className="mb-2 text-lg font-semibold text-foreground">CSS Token Theming</h3>
				<p className="mb-6 text-sm text-muted-foreground">
					A green/teal palette applied via{' '}
					<code className="rounded bg-muted px-1 py-0.5 text-xs">.green-theme</code> CSS class — zero code
					changes, pure variable swap.
				</p>

				<div className="grid gap-6 lg:grid-cols-2">
					{/* Default for comparison */}
					<div className="space-y-4">
						<p className="text-xs font-medium text-muted-foreground">Default Theme</p>
						<BalanceCard
							totalBalance={2_000_000_000n as Lamports}
							tokenSymbol="SOL"
							tokens={MOCK_TOKENS}
							size="sm"
						/>
						<NetworkSwitcher selectedNetwork="mainnet-beta" status="connected" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-2/3" />
					</div>

					{/* Green theme */}
					<div className="green-theme space-y-4 rounded-lg border border-border bg-background p-4">
						<p className="text-xs font-medium text-muted-foreground">Green Theme</p>
						<BalanceCard
							totalBalance={2_000_000_000n as Lamports}
							tokenSymbol="SOL"
							tokens={MOCK_TOKENS}
							size="sm"
						/>
						<NetworkSwitcher selectedNetwork="mainnet-beta" status="connected" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-2/3" />
					</div>
				</div>
			</div>
		</div>
	);
}
