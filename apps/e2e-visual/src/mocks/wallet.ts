import type { WalletConnectorMetadata } from '@solana/client';
import type { Address, Lamports } from '@solana/kit';
import { address } from '@solana/kit';
import backpackIcon from 'components/src/kit-components/ui/wallet-modal/assets/backpack.png';
import phantomIcon from 'components/src/kit-components/ui/wallet-modal/assets/phantom.png';
import solflareIcon from 'components/src/kit-components/ui/wallet-modal/assets/solflare.png';

// Well-known devnet addresses for mock/fallback data
export const MOCK_WALLET_ADDRESS: Address = address('6DMh7fYHrKdCJwCFUQfMfNAdLADi9xqsRKNzmZA31DkK');
export const MOCK_OTHER_ADDRESS: Address = address('Hb6dzd4pYxmFYKkJDWuhzBEUkkaE93sFcvXYtriTkmw9');

export const MOCK_BALANCE = 4_500_000_000n as Lamports; // 4.5 SOL

export const MOCK_WALLETS: WalletConnectorMetadata[] = [
	{
		id: 'phantom',
		name: 'Phantom',
		icon: phantomIcon,
		ready: true,
	},
	{
		id: 'solflare',
		name: 'Solflare',
		icon: solflareIcon,
		ready: true,
	},
	{
		id: 'backpack',
		name: 'Backpack',
		icon: backpackIcon,
		ready: true,
	},
];
