import { NetworkSwitcher } from 'components/src/kit-components/ui/network-switcher';
import { useState } from 'react';

export function NetworkSwitcherShowcase() {
	const [network, setNetwork] = useState<'mainnet-beta' | 'devnet' | 'testnet'>('devnet');
	const [openState, setOpenState] = useState(false);

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">NetworkSwitcher</h3>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Interactive</p>
					<NetworkSwitcher
						selectedNetwork={network}
						status="connected"
						onNetworkChange={(n) => setNetwork(n as typeof network)}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Controlled open</p>
					<NetworkSwitcher
						selectedNetwork="devnet"
						status="connected"
						open={openState}
						onOpenChange={setOpenState}
						onNetworkChange={() => setOpenState(false)}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Disabled</p>
					<NetworkSwitcher selectedNetwork="mainnet-beta" status="connected" disabled />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Connecting status</p>
					<NetworkSwitcher selectedNetwork="devnet" status="connecting" />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Error status</p>
					<NetworkSwitcher selectedNetwork="devnet" status="error" />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Custom networks</p>
					<NetworkSwitcher
						selectedNetwork="devnet"
						status="connected"
						networks={[
							{ id: 'devnet', label: 'Devnet' },
							{ id: 'mainnet-beta', label: 'Mainnet' },
						]}
					/>
				</div>
			</div>
		</div>
	);
}
