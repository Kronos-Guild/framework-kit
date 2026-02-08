'use client';

import type { ClusterMoniker } from '@solana/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { NetworkDropdown } from './NetworkDropdown';
import { NetworkHeader } from './NetworkHeader';
import { NetworkTrigger } from './NetworkTrigger';
import type { NetworkSwitcherProps } from './types';
import { DEFAULT_NETWORKS } from './types';

/**
 * NetworkSwitcher - A dropdown component for switching between Solana networks.
 *
 * Can be used standalone or embedded in other components (like ConnectWalletButton).
 *
 * @example
 * ```tsx
 * // Standalone usage
 * <NetworkSwitcher
 *   selectedNetwork="mainnet-beta"
 *   status="connected"
 *   onNetworkChange={(network) => console.log('Switched to:', network)}
 * />
 *
 * // Embedded in wallet dropdown (swap-in-place pattern)
 * <NetworkSwitcher
 *   selectedNetwork={currentNetwork}
 *   onNetworkChange={handleNetworkChange}
 *   variant="embedded"
 *   theme="dark"
 * />
 * ```
 */
export function NetworkSwitcher({
	selectedNetwork,
	status = 'connected',
	onNetworkChange,
	open: controlledOpen,
	onOpenChange,
	theme = 'dark',
	networks = DEFAULT_NETWORKS,
	className,
	disabled = false,
	variant = 'standalone',
}: NetworkSwitcherProps) {
	// Internal state for uncontrolled mode
	const [internalOpen, setInternalOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const isEmbedded = variant === 'embedded';

	// Use controlled state if provided, otherwise internal
	const isOpen = controlledOpen ?? internalOpen;

	const handleOpenChange = useCallback(
		(newOpen: boolean) => {
			if (controlledOpen === undefined) {
				setInternalOpen(newOpen);
			}
			onOpenChange?.(newOpen);
		},
		[controlledOpen, onOpenChange],
	);

	const handleToggle = useCallback(() => {
		if (!disabled) {
			handleOpenChange(!isOpen);
		}
	}, [disabled, isOpen, handleOpenChange]);

	const handleSelect = useCallback(
		(network: ClusterMoniker) => {
			onNetworkChange?.(network);
			handleOpenChange(false);
		},
		[onNetworkChange, handleOpenChange],
	);

	// Close on click outside (standalone only — embedded parent handles this)
	useEffect(() => {
		if (isEmbedded) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				handleOpenChange(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isOpen, isEmbedded, handleOpenChange]);

	// Close on Escape (standalone only — embedded parent handles this)
	useEffect(() => {
		if (isEmbedded) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				handleOpenChange(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isOpen, isEmbedded, handleOpenChange]);

	// ─── Embedded mode: swap-in-place (trigger ↔ header + dropdown) ───
	if (isEmbedded) {
		if (isOpen) {
			// Open: show header (back button) + network list
			return (
				<div className={cn('flex flex-col gap-1', className)}>
					<NetworkHeader isOpen theme={theme} onClick={() => handleOpenChange(false)} />
					<NetworkDropdown
						selectedNetwork={selectedNetwork}
						status={status}
						networks={networks}
						onSelect={handleSelect}
						theme={theme}
						variant="embedded"
					/>
				</div>
			);
		}

		// Closed: show trigger row
		return (
			<NetworkTrigger
				isOpen={false}
				theme={theme}
				variant="embedded"
				onClick={handleToggle}
				disabled={disabled}
				className={className}
			/>
		);
	}

	// ─── Standalone mode: positioned dropdown below trigger ───
	return (
		<div ref={containerRef} className={cn('relative inline-block', className)}>
			{/* Trigger is always visible */}
			<NetworkTrigger isOpen={isOpen} theme={theme} onClick={handleToggle} disabled={disabled} />

			{/* Dropdown appears below trigger when open */}
			{isOpen && (
				<div className="absolute top-full left-0 mt-1 z-50">
					<NetworkDropdown
						selectedNetwork={selectedNetwork}
						status={status}
						networks={networks}
						onSelect={handleSelect}
						theme={theme}
					/>
				</div>
			)}
		</div>
	);
}
