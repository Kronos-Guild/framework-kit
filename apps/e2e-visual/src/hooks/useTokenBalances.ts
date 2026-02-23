import type { Address } from '@solana/kit';
import { useClusterState, useWallet } from '@solana/react-hooks';
import type { TokenInfo } from 'components/src/kit-components/ui/balance-card';
import { useCallback, useEffect, useState } from 'react';
import { createIndexer } from 'tx-indexer';

const SOL_LOGO = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png';

// Well-known token logos by symbol
const TOKEN_LOGOS: Record<string, string> = {
	SOL: SOL_LOGO,
	USDC: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
	USDT: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
	BONK: 'https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I',
	JUP: 'https://static.jup.ag/jup/icon.png',
	RAY: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
	PYTH: 'https://pyth.network/token.svg',
};

export function useTokenBalances() {
	const wallet = useWallet();
	const cluster = useClusterState();
	const [tokens, setTokens] = useState<TokenInfo[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const address = wallet.status === 'connected' ? wallet.session.account.address : undefined;

	const fetchTokens = useCallback(async () => {
		if (!address) {
			setTokens([]);
			return;
		}

		setIsLoading(true);
		try {
			const indexer = createIndexer({ rpcUrl: cluster.endpoint });
			const balance = await indexer.getBalance(address);

			const mapped: TokenInfo[] = [];

			// Add SOL as first token
			if (balance.sol) {
				mapped.push({
					symbol: 'SOL',
					name: 'Solana',
					balance: balance.sol.ui,
					icon: SOL_LOGO,
				});
			}

			// Add SPL tokens
			for (const token of balance.tokens) {
				if (token.amount.ui > 0) {
					mapped.push({
						symbol: token.symbol || token.mint.slice(0, 4),
						name: token.symbol || undefined,
						balance: token.amount.ui,
						icon: TOKEN_LOGOS[token.symbol] || undefined,
						mintAddress: token.mint as Address,
					});
				}
			}

			setTokens(mapped);
		} catch (err) {
			console.error('Failed to fetch token balances:', err);
		} finally {
			setIsLoading(false);
		}
	}, [address, cluster.endpoint]);

	useEffect(() => {
		fetchTokens();
	}, [fetchTokens]);

	return { tokens, isLoading, refetch: fetchTokens };
}
