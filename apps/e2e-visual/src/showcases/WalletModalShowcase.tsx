import { WalletModal } from 'components/src/kit-components/ui/wallet-modal';
import { MOCK_WALLETS } from '../mocks/wallet';

export function WalletModalShowcase() {
	const connectingWallet = MOCK_WALLETS[0];

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">WalletModal</h3>
			<div className="grid gap-4 lg:grid-cols-2">
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">List view</p>
					<div className="rounded-xl border border-border p-1">
						<WalletModal
							wallets={MOCK_WALLETS}
							view="list"
							onSelectWallet={() => {}}
							onBack={() => {}}
							onClose={() => {}}
							onRetry={() => {}}
						/>
					</div>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Connecting</p>
					<div className="rounded-xl border border-border p-1">
						{connectingWallet && (
							<WalletModal
								wallets={MOCK_WALLETS}
								view="connecting"
								connectingWallet={connectingWallet}
								onSelectWallet={() => {}}
								onBack={() => {}}
								onClose={() => {}}
								onRetry={() => {}}
							/>
						)}
					</div>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Error</p>
					<div className="rounded-xl border border-border p-1">
						<WalletModal
							wallets={MOCK_WALLETS}
							view="error"
							error={{ title: 'Connection failed', message: 'User rejected the request' }}
							onSelectWallet={() => {}}
							onBack={() => {}}
							onClose={() => {}}
							onRetry={() => {}}
						/>
					</div>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Empty wallets</p>
					<div className="rounded-xl border border-border p-1">
						<WalletModal
							wallets={[]}
							view="list"
							onSelectWallet={() => {}}
							onBack={() => {}}
							onClose={() => {}}
							onRetry={() => {}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
