import { AddressDisplayShowcase } from '../showcases/AddressDisplayShowcase';
import { BalanceCardShowcase } from '../showcases/BalanceCardShowcase';
import { ConnectWalletButtonShowcase } from '../showcases/ConnectWalletButtonShowcase';
import { DashboardShellShowcase } from '../showcases/DashboardShellShowcase';
import { NetworkSwitcherShowcase } from '../showcases/NetworkSwitcherShowcase';
import { SkeletonShowcase } from '../showcases/SkeletonShowcase';
import { SwapInputShowcase } from '../showcases/SwapInputShowcase';
import { TransactionTableShowcase } from '../showcases/TransactionTableShowcase';
import { TransactionToastShowcase } from '../showcases/TransactionToastShowcase';
import { WalletModalShowcase } from '../showcases/WalletModalShowcase';

export function ComponentShowcase() {
	return (
		<div className="space-y-12">
			<div>
				<h2 className="mb-2 text-2xl font-bold text-foreground">Component Showcase</h2>
				<p className="text-sm text-muted-foreground">
					Every component in every state, rendered simultaneously.
				</p>
			</div>

			<section className="rounded-xl border border-border bg-card p-6">
				<SkeletonShowcase />
			</section>

			<section className="rounded-xl border border-border bg-card p-6">
				<AddressDisplayShowcase />
			</section>

			<section className="rounded-xl border border-border bg-card p-6">
				<DashboardShellShowcase />
			</section>

			<section className="rounded-xl border border-border bg-card p-6">
				<TransactionToastShowcase />
			</section>

			<section className="rounded-xl border border-border bg-card p-6">
				<BalanceCardShowcase />
			</section>

			<section className="rounded-xl border border-border bg-card p-6">
				<NetworkSwitcherShowcase />
			</section>

			<section className="rounded-xl border border-border bg-card p-6">
				<SwapInputShowcase />
			</section>

			<section className="rounded-xl border border-border bg-card p-6">
				<TransactionTableShowcase />
			</section>

			<section className="rounded-xl border border-border bg-card p-6">
				<ConnectWalletButtonShowcase />
			</section>

			<section className="rounded-xl border border-border bg-card p-6">
				<WalletModalShowcase />
			</section>
		</div>
	);
}
