import type { TokenInfo } from 'components/src/kit-components/ui/balance-card';
import type { SwapTokenInfo } from 'components/src/kit-components/ui/swap-input';

const SOL_LOGO = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png';
const USDC_LOGO =
	'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png';
const USDT_LOGO =
	'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg';

export const MOCK_TOKENS: TokenInfo[] = [
	{
		symbol: 'SOL',
		name: 'Solana',
		balance: 4.5,
		icon: SOL_LOGO,
		fiatValue: 598.5,
	},
	{
		symbol: 'USDC',
		name: 'USD Coin',
		balance: 250.0,
		icon: USDC_LOGO,
		fiatValue: 250.0,
	},
	{
		symbol: 'USDT',
		name: 'Tether',
		balance: 100.0,
		icon: USDT_LOGO,
		fiatValue: 100.0,
	},
];

export const SOL_TOKEN: SwapTokenInfo = {
	symbol: 'SOL',
	name: 'Solana',
	logoURI: SOL_LOGO,
	decimals: 9,
};

export const USDC_TOKEN: SwapTokenInfo = {
	symbol: 'USDC',
	name: 'USD Coin',
	logoURI: USDC_LOGO,
	decimals: 6,
};

export const SWAP_TOKEN_LIST: SwapTokenInfo[] = [
	SOL_TOKEN,
	USDC_TOKEN,
	{ symbol: 'USDT', name: 'Tether', logoURI: USDT_LOGO, decimals: 6 },
	{ symbol: 'BONK', name: 'Bonk', decimals: 5 },
	{ symbol: 'JUP', name: 'Jupiter', decimals: 6 },
	{ symbol: 'RAY', name: 'Raydium', decimals: 6 },
	{ symbol: 'ORCA', name: 'Orca', decimals: 6 },
	{ symbol: 'MNDE', name: 'Marinade', decimals: 9 },
];
