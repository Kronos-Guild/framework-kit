import { SwapInput, TokenInput } from 'components/src/kit-components/ui/swap-input';
import { useState } from 'react';
import { SOL_TOKEN, SWAP_TOKEN_LIST, USDC_TOKEN } from '../mocks/tokens';

export function SwapInputShowcase() {
	const [payAmount, setPayAmount] = useState('1.5');
	const [receiveAmount, setReceiveAmount] = useState('199.50');
	const [payToken, setPayToken] = useState(SOL_TOKEN);
	const [receiveToken, setReceiveToken] = useState(USDC_TOKEN);

	// Standalone TokenInput state
	const [standaloneAmount, setStandaloneAmount] = useState('');
	const [standaloneToken, setStandaloneToken] = useState(SOL_TOKEN);

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">SwapInput</h3>
			<div className="grid gap-4 lg:grid-cols-2">
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Empty</p>
					<SwapInput
						payAmount=""
						onPayAmountChange={() => {}}
						receiveAmount=""
						onReceiveAmountChange={() => {}}
						payToken={SOL_TOKEN}
						receiveToken={USDC_TOKEN}
						payTokens={SWAP_TOKEN_LIST}
						receiveTokens={SWAP_TOKEN_LIST}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Filled (interactive)</p>
					<SwapInput
						payAmount={payAmount}
						onPayAmountChange={setPayAmount}
						receiveAmount={receiveAmount}
						onReceiveAmountChange={setReceiveAmount}
						payToken={payToken}
						receiveToken={receiveToken}
						payTokens={SWAP_TOKEN_LIST}
						receiveTokens={SWAP_TOKEN_LIST}
						onPayTokenChange={setPayToken}
						onReceiveTokenChange={setReceiveToken}
						payBalance="4.5"
						onSwapDirection={() => {
							setPayAmount(receiveAmount);
							setReceiveAmount(payAmount);
							setPayToken(receiveToken);
							setReceiveToken(payToken);
						}}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Insufficient balance</p>
					<SwapInput
						payAmount="10"
						onPayAmountChange={() => {}}
						receiveAmount="1330"
						onReceiveAmountChange={() => {}}
						payToken={SOL_TOKEN}
						receiveToken={USDC_TOKEN}
						payTokens={SWAP_TOKEN_LIST}
						receiveTokens={SWAP_TOKEN_LIST}
						payBalance="4.5"
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Loading</p>
					<SwapInput
						payAmount="2"
						onPayAmountChange={() => {}}
						receiveAmount=""
						onReceiveAmountChange={() => {}}
						payToken={SOL_TOKEN}
						receiveToken={USDC_TOKEN}
						isLoading
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Disabled</p>
					<SwapInput
						payAmount="1"
						onPayAmountChange={() => {}}
						receiveAmount="133"
						onReceiveAmountChange={() => {}}
						payToken={SOL_TOKEN}
						receiveToken={USDC_TOKEN}
						disabled
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Small size</p>
					<SwapInput
						payAmount="1"
						onPayAmountChange={() => {}}
						receiveAmount="133"
						onReceiveAmountChange={() => {}}
						payToken={SOL_TOKEN}
						receiveToken={USDC_TOKEN}
						payTokens={SWAP_TOKEN_LIST}
						receiveTokens={SWAP_TOKEN_LIST}
						size="sm"
					/>
				</div>
			</div>

			<h3 className="text-lg font-semibold text-foreground mt-8">TokenInput (standalone)</h3>
			<div className="grid gap-4 lg:grid-cols-2">
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">With dropdown</p>
					<TokenInput
						label="Send"
						amount={standaloneAmount}
						onAmountChange={setStandaloneAmount}
						token={standaloneToken}
						tokens={SWAP_TOKEN_LIST}
						onTokenChange={setStandaloneToken}
						balance="4.5"
					/>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Display-only (no tokens list)</p>
					<TokenInput label="Stake" amount="2.5" token={SOL_TOKEN} readOnly balance="4.5" />
				</div>
			</div>
		</div>
	);
}
