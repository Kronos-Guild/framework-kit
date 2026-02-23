import type { ClusterMoniker, WalletConnectorMetadata } from '@solana/client';
import { resolveCluster } from '@solana/client';
import type { Address, Lamports } from '@solana/kit';
import {
	useBalance,
	useClusterState,
	useWalletActions,
	useWalletConnection,
	useWalletModalState,
} from '@solana/react-hooks';
import { BalanceCard } from 'components/src/kit-components/ui/balance-card';
import { ConnectWalletButton } from 'components/src/kit-components/ui/connect-wallet-button';
import { DashboardShell } from 'components/src/kit-components/ui/dashboard-shell';
import { NetworkSwitcher } from 'components/src/kit-components/ui/network-switcher';
import { SwapInput } from 'components/src/kit-components/ui/swap-input';
import { TransactionTable } from 'components/src/kit-components/ui/transaction-table';
import { useTransactionToast } from 'components/src/kit-components/ui/transaction-toast';
import { WalletModal } from 'components/src/kit-components/ui/wallet-modal';
import { useState } from 'react';
import { useTokenBalances } from '../hooks/useTokenBalances';
import { useTransactions } from '../hooks/useTransactions';
import { MOCK_TOKENS, SOL_TOKEN, SWAP_TOKEN_LIST, USDC_TOKEN } from '../mocks/tokens';
import { MOCK_TRANSACTIONS, MOCK_TX_WALLET } from '../mocks/transactions';

// Map endpoint back to moniker for display
function endpointToMoniker(endpoint: string): ClusterMoniker {
	if (endpoint.includes('devnet')) return 'devnet';
	if (endpoint.includes('testnet')) return 'testnet';
	if (endpoint.includes('mainnet')) return 'mainnet-beta';
	if (endpoint.includes('127.0.0.1') || endpoint.includes('localhost')) return 'localnet';
	return 'devnet';
}

export function Dashboard() {
	const modal = useWalletModalState();
	const { status, wallet, isReady, disconnect, currentConnector } = useWalletConnection();
	const cluster = useClusterState();
	const actions = useWalletActions();
	const { toast, update } = useTransactionToast();

	const walletAddress = wallet?.account.address as Address | undefined;
	const { lamports, fetching: balanceLoading } = useBalance(walletAddress);
	const { tokens: liveTokens, isLoading: tokensLoading } = useTokenBalances();
	const { transactions: liveTransactions, isLoading: txLoading } = useTransactions();

	// Use live data when connected, mock data when disconnected
	const transactions = walletAddress ? liveTransactions : MOCK_TRANSACTIONS;
	const txWalletAddress = walletAddress ?? MOCK_TX_WALLET;
	const balance = lamports ?? (0n as Lamports);
	const tokens = walletAddress ? liveTokens : MOCK_TOKENS;

	// Derive current network from cluster endpoint
	const selectedNetwork = endpointToMoniker(cluster.endpoint);

	// Swap input state
	const [payAmount, setPayAmount] = useState('');
	const [receiveAmount, setReceiveAmount] = useState('');
	const [payToken, setPayToken] = useState(SOL_TOKEN);
	const [receiveToken, setReceiveToken] = useState(USDC_TOKEN);

	// Wallet modal view state
	const [modalView, setModalView] = useState<'list' | 'connecting' | 'error'>('list');
	const [connectingWallet, setConnectingWallet] = useState<WalletConnectorMetadata | null>(null);
	const [modalError, setModalError] = useState<{ title?: string; message?: string } | null>(null);

	const handleSelectWallet = async (w: WalletConnectorMetadata) => {
		setConnectingWallet(w);
		setModalView('connecting');
		try {
			await modal.connect(w.id);
			setModalView('list');
			modal.close();
		} catch (err) {
			setModalView('error');
			setModalError({
				title: 'Connection failed',
				message: err instanceof Error ? err.message : 'Unknown error',
			});
		}
	};

	const handleNetworkChange = (network: ClusterMoniker) => {
		const resolved = resolveCluster({ moniker: network });
		actions.setCluster(resolved.endpoint);
	};

	const handleFireToast = () => {
		const id = toast({
			signature: '5xG7abc...mock',
			status: 'pending',
			type: 'sent',
		});
		setTimeout(() => update(id, { status: 'success' }), 2000);
	};

	const connectorMeta = currentConnector
		? { id: currentConnector.id, name: currentConnector.name, icon: currentConnector.icon }
		: undefined;

	// Map cluster status to NetworkSwitcher status
	const networkStatus =
		cluster.status.status === 'ready'
			? ('connected' as const)
			: cluster.status.status === 'error'
				? ('error' as const)
				: ('connecting' as const);

	// Map real connectors to WalletConnectorMetadata for the modal
	const walletList: WalletConnectorMetadata[] = modal.connectors.map((c) => ({
		id: c.id,
		name: c.name,
		icon: c.icon,
		ready: true,
	}));

	return (
		<div className="space-y-6">
			<DashboardShell
				header={
					<div className="flex w-full items-center justify-between">
						<NetworkSwitcher
							selectedNetwork={selectedNetwork}
							status={networkStatus}
							onNetworkChange={handleNetworkChange}
						/>
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={handleFireToast}
								className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent"
							>
								Fire Toast
							</button>
							<ConnectWalletButton
								status={status}
								isReady={isReady}
								wallet={walletAddress ? { address: walletAddress } : undefined}
								currentConnector={connectorMeta}
								balance={balance}
								balanceLoading={balanceLoading}
								onConnect={modal.open}
								onDisconnect={disconnect}
								selectedNetwork={selectedNetwork}
								networkStatus={networkStatus}
								onNetworkChange={handleNetworkChange}
							/>
						</div>
					</div>
				}
			>
				<div className="grid gap-6 lg:grid-cols-2">
					<BalanceCard
						walletAddress={walletAddress}
						totalBalance={balance}
						tokenSymbol="SOL"
						tokens={tokens}
						isLoading={balanceLoading || tokensLoading}
					/>
					<SwapInput
						payAmount={payAmount}
						onPayAmountChange={setPayAmount}
						receiveAmount={receiveAmount}
						onReceiveAmountChange={setReceiveAmount}
						payToken={payToken}
						payTokens={SWAP_TOKEN_LIST}
						onPayTokenChange={setPayToken}
						receiveToken={receiveToken}
						receiveTokens={SWAP_TOKEN_LIST}
						onReceiveTokenChange={setReceiveToken}
						payBalance={walletAddress ? String(Number(balance) / 1e9) : '4.5'}
						onSwapDirection={() => {
							setPayAmount(receiveAmount);
							setReceiveAmount(payAmount);
							setPayToken(receiveToken);
							setReceiveToken(payToken);
						}}
					/>
				</div>
				<div className="mt-6">
					<TransactionTable
						walletAddress={txWalletAddress}
						transactions={transactions}
						isLoading={walletAddress ? txLoading : false}
					/>
				</div>
			</DashboardShell>

			{/* WalletModal overlay */}
			{modal.isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<WalletModal
						wallets={walletList.length > 0 ? walletList : []}
						view={modalView}
						connectingWallet={connectingWallet}
						error={modalError}
						onSelectWallet={handleSelectWallet}
						onBack={() => setModalView('list')}
						onClose={() => {
							modal.close();
							setModalView('list');
						}}
						onRetry={() => {
							if (connectingWallet) handleSelectWallet(connectingWallet);
						}}
					/>
				</div>
			)}
		</div>
	);
}
