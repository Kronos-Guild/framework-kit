import { useClusterState, useWallet } from '@solana/react-hooks';
import { useCallback, useEffect, useState } from 'react';
import { type ClassifiedTransaction, createIndexer } from 'tx-indexer';

export function useTransactions(limit = 10) {
	const wallet = useWallet();
	const cluster = useClusterState();
	const [transactions, setTransactions] = useState<ClassifiedTransaction[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const address = wallet.status === 'connected' ? wallet.session.account.address : undefined;

	const fetchTransactions = useCallback(async () => {
		if (!address) return;

		setIsLoading(true);
		setError(null);

		try {
			const indexer = createIndexer({ rpcUrl: cluster.endpoint });
			const txs = await indexer.getTransactions(address, {
				limit,
				filterSpam: true,
			});
			setTransactions(txs);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
		} finally {
			setIsLoading(false);
		}
	}, [address, cluster.endpoint, limit]);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	return { transactions, isLoading, error, refetch: fetchTransactions };
}
