import { TransactionToast, useTransactionToast } from 'components/src/kit-components/ui/transaction-toast';

const MOCK_SIG = '5xG7abcMockSignatureForToastDisplay1111111111';

export function TransactionToastShowcase() {
	const { toast, update } = useTransactionToast();

	const handleFireToast = (status: 'pending' | 'success' | 'error', type: 'sent' | 'received' | 'swapped') => {
		const id = toast({ signature: MOCK_SIG, status, type });
		if (status === 'pending') {
			setTimeout(() => update(id, { status: 'success' }), 2000);
		}
	};

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">TransactionToast</h3>

			{/* Static previews (all 9 status/type combos) */}
			<div className="grid gap-3 sm:grid-cols-3">
				{(['sent', 'received', 'swapped'] as const).map((type) =>
					(['pending', 'success', 'error'] as const).map((status) => (
						<div key={`${type}-${status}`} className="space-y-1">
							<p className="text-xs text-muted-foreground capitalize">
								{type} / {status}
							</p>
							<div className="rounded-md border border-border p-2">
								<TransactionToast signature={MOCK_SIG} status={status} type={type} />
							</div>
						</div>
					)),
				)}
			</div>

			{/* Interactive toast buttons */}
			<div className="space-y-2">
				<p className="text-sm text-muted-foreground">Provider flow (fires real toasts)</p>
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => handleFireToast('pending', 'sent')}
						className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
					>
						Pending Sent
					</button>
					<button
						type="button"
						onClick={() => handleFireToast('success', 'received')}
						className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
					>
						Success Received
					</button>
					<button
						type="button"
						onClick={() => handleFireToast('error', 'swapped')}
						className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
					>
						Error Swapped
					</button>
				</div>
			</div>
		</div>
	);
}
