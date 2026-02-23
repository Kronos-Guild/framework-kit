import type { Lamports } from '@solana/kit';
import { BalanceCard } from 'components/src/kit-components/ui/balance-card';
import { MOCK_TOKENS } from '../mocks/tokens';
import { MOCK_WALLET_ADDRESS } from '../mocks/wallet';

export function BalanceCardShowcase() {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">BalanceCard</h3>
			<div className="grid gap-4 lg:grid-cols-2">
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Default (md)</p>
					<BalanceCard
						walletAddress={MOCK_WALLET_ADDRESS}
						totalBalance={4_500_000_000n as Lamports}
						tokenSymbol="SOL"
						tokens={MOCK_TOKENS}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Loading</p>
					<BalanceCard totalBalance={0n as Lamports} isLoading />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Error + retry</p>
					<BalanceCard
						totalBalance={0n as Lamports}
						error="Failed to fetch balance"
						onRetry={() => alert('Retry clicked')}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Zero balance</p>
					<BalanceCard
						walletAddress={MOCK_WALLET_ADDRESS}
						totalBalance={0n as Lamports}
						tokenSymbol="SOL"
						tokens={[]}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Small size</p>
					<BalanceCard
						walletAddress={MOCK_WALLET_ADDRESS}
						totalBalance={4_500_000_000n as Lamports}
						tokenSymbol="SOL"
						tokens={MOCK_TOKENS}
						size="sm"
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Large size</p>
					<BalanceCard
						walletAddress={MOCK_WALLET_ADDRESS}
						totalBalance={4_500_000_000n as Lamports}
						tokenSymbol="SOL"
						tokens={MOCK_TOKENS}
						size="lg"
					/>
				</div>
			</div>
		</div>
	);
}
