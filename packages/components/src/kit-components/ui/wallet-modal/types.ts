/**
 * Shared types for the WalletModal component
 */

/** Theme variants for the wallet modal */
export type WalletModalTheme = 'dark' | 'light';

/** Wallet label types */
export type WalletLabelType = 'recent' | 'detected' | 'installed';

/** Modal view states */
export type ModalView = 'list' | 'connecting' | 'error';

/** Connection error types */
export interface ConnectionError {
	/** Error message to display */
	message: string;
	/** Original error for debugging */
	cause?: unknown;
}
