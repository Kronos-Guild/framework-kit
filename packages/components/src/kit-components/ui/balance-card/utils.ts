/**
 * Utility functions for balance formatting and display
 */

export interface FormatBalanceOptions {
	decimals?: number;
	locale?: string;
	abbreviate?: boolean;
	showLessThan?: boolean;
}

/**
 * Formats a balance number with proper locale formatting
 * @param balance - The balance to format (number or string)
 * @param options - Formatting options
 * @returns Formatted balance string
 */
export function formatBalance(balance: number | string | null | undefined, options: FormatBalanceOptions = {}): string {
	const { decimals = 2, locale = 'en-US', abbreviate = false, showLessThan = true } = options;

	if (balance === null || balance === undefined) {
		return '—';
	}

	const num = typeof balance === 'string' ? parseFloat(balance) : balance;

	if (Number.isNaN(num)) {
		return '—';
	}

	if (!Number.isFinite(num)) {
		return '—';
	}

	// Handle very small numbers
	if (num > 0 && num < 0.01 && showLessThan) {
		return '< 0.01';
	}

	// Handle abbreviation for large numbers
	if (abbreviate && Math.abs(num) >= 1_000_000_000) {
		return `${(num / 1_000_000_000).toFixed(2)}B`;
	}
	if (abbreviate && Math.abs(num) >= 1_000_000) {
		return `${(num / 1_000_000).toFixed(2)}M`;
	}
	if (abbreviate && Math.abs(num) >= 1_000) {
		return `${(num / 1_000).toFixed(2)}K`;
	}

	return new Intl.NumberFormat(locale, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}).format(num);
}

/**
 * Formats a fiat currency value
 * @param value - The value to format
 * @param currency - Currency code (default: USD)
 * @param locale - Locale for formatting (default: en-US)
 * @returns Formatted currency string
 */
export function formatFiatValue(value: number | string | null | undefined, currency = 'USD', locale = 'en-US'): string {
	if (value === null || value === undefined) {
		return '';
	}

	const num = typeof value === 'string' ? parseFloat(value) : value;

	if (Number.isNaN(num) || !Number.isFinite(num)) {
		return '';
	}

	try {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(num);
	} catch {
		// Fallback to USD if invalid currency code is provided
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(num);
	}
}

/**
 * Truncates a wallet address for display
 * @param address - Full wallet address
 * @param startChars - Number of characters to show at start (default: 4)
 * @param endChars - Number of characters to show at end (default: 4)
 * @returns Truncated address string
 */
export function truncateAddress(address: string | null | undefined, startChars = 4, endChars = 4): string {
	if (!address) {
		return '';
	}

	if (address.length <= startChars + endChars + 3) {
		return address;
	}

	return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Generates a deterministic color based on a string (for fallback token icons)
 * @param str - Input string (typically token symbol)
 * @returns HSL color string
 */
export function stringToColor(str: string): string {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash % 360);
	return `hsl(${hue}, 65%, 50%)`;
}

/**
 * Formats percentage change with sign
 * @param change - Percentage change value
 * @param decimals - Decimal places (default: 2)
 * @returns Formatted percentage string with sign
 */
export function formatPercentageChange(change: number | null | undefined, decimals = 2): string {
	if (change === null || change === undefined || Number.isNaN(change)) {
		return '0.00%';
	}

	const sign = change > 0 ? '+' : '';
	return `${sign}${change.toFixed(decimals)}%`;
}

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		// Fallback for older browsers
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		textArea.style.left = '-999999px';
		document.body.appendChild(textArea);
		textArea.select();
		try {
			document.execCommand('copy');
			document.body.removeChild(textArea);
			return true;
		} catch {
			document.body.removeChild(textArea);
			return false;
		}
	}
}
