import { AddressDisplay } from 'components/src/kit-components/ui/address-display';
import { MOCK_WALLET_ADDRESS } from '../mocks/wallet';

export function AddressDisplayShowcase() {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">AddressDisplay</h3>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Default</p>
					<AddressDisplay address={MOCK_WALLET_ADDRESS} />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">No tooltip</p>
					<AddressDisplay address={MOCK_WALLET_ADDRESS} showTooltip={false} />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">No explorer link</p>
					<AddressDisplay address={MOCK_WALLET_ADDRESS} showExplorerLink={false} />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Devnet</p>
					<AddressDisplay address={MOCK_WALLET_ADDRESS} network="devnet" />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Custom className</p>
					<AddressDisplay address={MOCK_WALLET_ADDRESS} className="text-primary font-bold" />
				</div>
			</div>
		</div>
	);
}
