import { ChevronUp } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import type { TokenInfo, TokenListProps } from './types';
import { formatFiatValue } from './utils';

/**
 * Token row component for displaying individual token info
 */
const TokenRow: React.FC<{
	token: TokenInfo;
	variant: 'default' | 'dark' | 'light';
	locale?: string;
}> = ({ token, variant, locale = 'en-US' }) => {
	const isDark = variant === 'dark' || variant === 'default';

	const textColor = isDark ? 'text-white' : 'text-gray-900';
	const hoverBg = isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-50';

	const displayBalance = token.fiatValue
		? formatFiatValue(token.fiatValue, 'USD', locale)
		: typeof token.balance === 'number'
			? token.balance.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
			: token.balance;

	return (
		<div className={`flex items-center justify-between py-2 px-1 ${hoverBg} rounded transition-colors`}>
			<span className={`text-sm ${textColor}`}>{token.symbol}</span>
			<span className={`text-sm ${textColor}`}>{displayBalance}</span>
		</div>
	);
};

/**
 * Expandable token list component showing all tokens in a wallet
 */
export const TokenList: React.FC<TokenListProps> = ({
	tokens,
	isExpanded: controlledExpanded,
	onExpandedChange,
	variant = 'default',
	className = '',
	locale = 'en-US',
}) => {
	const [internalExpanded, setInternalExpanded] = useState(false);

	const isControlled = controlledExpanded !== undefined;
	const isExpanded = isControlled ? controlledExpanded : internalExpanded;

	const handleToggle = () => {
		const newExpanded = !isExpanded;
		if (!isControlled) {
			setInternalExpanded(newExpanded);
		}
		onExpandedChange?.(newExpanded);
	};

	const isDark = variant === 'dark' || variant === 'default';

	const textColor = isDark ? 'text-gray-300' : 'text-gray-600';
	const headerTextColor = isDark ? 'text-gray-400' : 'text-gray-500';
	const borderColor = isDark ? 'border-[#2a2a2a]' : 'border-gray-200';
	const iconColor = isDark ? 'text-gray-400' : 'text-gray-500';

	return (
		<div className={`border-t ${borderColor} ${className}`}>
			{/* Toggle header */}
			<button
				type="button"
				onClick={handleToggle}
				className={`flex items-center justify-between w-full py-3 ${textColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded`}
				aria-expanded={isExpanded}
				aria-controls="token-list-content"
			>
				<span className="text-sm">View all tokens</span>
				<ChevronUp
					size={20}
					className={`${iconColor} transition-transform duration-200 ${isExpanded ? '' : 'rotate-180'}`}
				/>
			</button>

			{/* Expandable content */}
			<div
				id="token-list-content"
				className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
			>
				{/* Table header */}
				<div
					className={`flex items-center justify-between py-2 px-1 text-xs ${headerTextColor} border-b ${borderColor}`}
				>
					<span>Token</span>
					<span>Balance</span>
				</div>

				{/* Token rows */}
				{tokens.length === 0 ? (
					<div className={`py-4 text-center text-sm ${textColor}`}>No tokens yet</div>
				) : (
					<div className="py-1">
						{tokens.map((token) => (
							<TokenRow
								key={token.mintAddress || token.symbol}
								token={token}
								variant={variant}
								locale={locale}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
