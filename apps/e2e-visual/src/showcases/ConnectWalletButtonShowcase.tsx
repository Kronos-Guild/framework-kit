import type { Lamports } from '@solana/kit';
import { ConnectWalletButton } from 'components/src/kit-components/ui/connect-wallet-button';
import { MOCK_WALLET_ADDRESS } from '../mocks/wallet';

export function ConnectWalletButtonShowcase() {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">ConnectWalletButton</h3>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Disconnected</p>
					<ConnectWalletButton status="disconnected" onConnect={() => {}} />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Connecting</p>
					<ConnectWalletButton status="connecting" currentConnector={{ id: 'phantom', name: 'Phantom' }} />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Connected</p>
					<ConnectWalletButton
						status="connected"
						wallet={{ address: MOCK_WALLET_ADDRESS }}
						currentConnector={{ id: 'phantom', name: 'Phantom' }}
						balance={4_500_000_000n as Lamports}
						onDisconnect={() => {}}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Connected (balance loading)</p>
					<ConnectWalletButton
						status="connected"
						wallet={{ address: MOCK_WALLET_ADDRESS }}
						currentConnector={{ id: 'phantom', name: 'Phantom' }}
						balanceLoading
						onDisconnect={() => {}}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Not ready (SSR)</p>
					<ConnectWalletButton status="disconnected" isReady={false} />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Zero balance</p>
					<ConnectWalletButton
						status="connected"
						wallet={{ address: MOCK_WALLET_ADDRESS }}
						currentConnector={{ id: 'phantom', name: 'Phantom' }}
						balance={0n as Lamports}
						onDisconnect={() => {}}
					/>
				</div>
			</div>
		</div>
	);
}
