import { address } from '@solana/kit';
import type { ClassifiedTransaction } from 'tx-indexer';

const WALLET = address('6DMh7fYHrKdCJwCFUQfMfNAdLADi9xqsRKNzmZA31DkK');
const OTHER = address('Hb6dzd4pYxmFYKkJDWuhzBEUkkaE93sFcvXYtriTkmw9');

const SOL_LOGO = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png';
const USDC_LOGO =
	'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png';

function makeTransferTx(params: {
	signature: string;
	blockTimeSeconds: number;
	sender: string;
	receiver: string;
	symbol: string;
	amountUi: number;
	fiat?: number;
	logoURI?: string;
}): ClassifiedTransaction {
	return {
		tx: {
			signature: params.signature,
			slot: 0,
			blockTime: params.blockTimeSeconds,
			err: null,
			programIds: [],
			protocol: null,
			memo: null,
		},
		classification: {
			primaryType: 'transfer',
			primaryAmount: {
				token: {
					mint: 'So11111111111111111111111111111111111111112',
					symbol: params.symbol,
					decimals: 9,
					logoURI: params.logoURI,
				},
				amountRaw: '0',
				amountUi: params.amountUi,
				fiat: params.fiat
					? {
							currency: 'USD',
							amount: params.fiat,
							pricePerUnit: params.fiat / Math.max(params.amountUi, 1),
						}
					: undefined,
			},
			sender: params.sender,
			receiver: params.receiver,
			counterparty: {
				type: 'unknown',
				address: params.sender === WALLET ? params.receiver : params.sender,
			},
			confidence: 1,
		},
		legs: [
			{
				accountId: params.sender,
				side: 'debit',
				amount: {
					token: {
						mint: 'So11111111111111111111111111111111111111112',
						symbol: params.symbol,
						decimals: 9,
						logoURI: params.logoURI,
					},
					amountRaw: '0',
					amountUi: params.amountUi,
				},
				role: 'sent',
			},
			{
				accountId: params.receiver,
				side: 'credit',
				amount: {
					token: {
						mint: 'So11111111111111111111111111111111111111112',
						symbol: params.symbol,
						decimals: 9,
						logoURI: params.logoURI,
					},
					amountRaw: '0',
					amountUi: params.amountUi,
				},
				role: 'received',
			},
		],
	} as unknown as ClassifiedTransaction;
}

export const MOCK_TRANSACTIONS: ClassifiedTransaction[] = [
	makeTransferTx({
		signature: '5xG7abc1111111111111111111111111111111111111119Kp2',
		blockTimeSeconds: Math.floor(Date.now() / 1000) - 3600,
		sender: WALLET,
		receiver: OTHER,
		symbol: 'SOL',
		amountUi: 3.0,
		fiat: 399.62,
		logoURI: SOL_LOGO,
	}),
	makeTransferTx({
		signature: '6xG7abc2222222222222222222222222222222222222229Kp3',
		blockTimeSeconds: Math.floor(Date.now() / 1000) - 7200,
		sender: OTHER,
		receiver: WALLET,
		symbol: 'USDC',
		amountUi: 95.0,
		logoURI: USDC_LOGO,
	}),
	makeTransferTx({
		signature: '7xG7abc3333333333333333333333333333333333333339Kp4',
		blockTimeSeconds: Math.floor(Date.now() / 1000) - 86400,
		sender: WALLET,
		receiver: OTHER,
		symbol: 'SOL',
		amountUi: 1.25,
		fiat: 166.25,
		logoURI: SOL_LOGO,
	}),
	makeTransferTx({
		signature: '8xG7abc4444444444444444444444444444444444444449Kp5',
		blockTimeSeconds: Math.floor(Date.now() / 1000) - 172800,
		sender: OTHER,
		receiver: WALLET,
		symbol: 'USDC',
		amountUi: 500.0,
		logoURI: USDC_LOGO,
	}),
];

export { WALLET as MOCK_TX_WALLET };
