import { TransactionTable } from 'components/src/kit-components/ui/transaction-table';
import { MOCK_TRANSACTIONS, MOCK_TX_WALLET } from '../mocks/transactions';

export function TransactionTableShowcase() {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">TransactionTable</h3>
			<div className="space-y-6">
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">With data</p>
					<TransactionTable walletAddress={MOCK_TX_WALLET} transactions={MOCK_TRANSACTIONS} />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Loading</p>
					<TransactionTable walletAddress={MOCK_TX_WALLET} transactions={[]} isLoading />
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Empty</p>
					<TransactionTable
						walletAddress={MOCK_TX_WALLET}
						transactions={[]}
						emptyMessage="No transactions found"
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Filtered (sent only)</p>
					<TransactionTable
						walletAddress={MOCK_TX_WALLET}
						transactions={MOCK_TRANSACTIONS}
						typeFilter="sent"
					/>
				</div>
			</div>
		</div>
	);
}
