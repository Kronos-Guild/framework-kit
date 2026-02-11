import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import type { FilterDropdownProps } from './types';

/**
 * A dropdown filter control for selecting a single option from a list.
 * Used internally by TransactionTable for date and type filters,
 * but can be used standalone for custom filter UIs.
 *
 * @example
 * ```tsx
 * <FilterDropdown
 *   icon={<Calendar className="size-3.5" />}
 *   value={dateFilter}
 *   options={[
 *     { value: 'all', label: 'All time' },
 *     { value: '7d', label: 'Last 7 days' },
 *   ]}
 *   onChange={setDateFilter}
 * />
 * ```
 */
export function FilterDropdown<TValue extends string>({
	icon,
	value,
	options,
	onChange,
	theme = 'dark',
	className,
}: FilterDropdownProps<TValue>) {
	const [open, setOpen] = useState(false);
	const id = useId();
	const rootRef = useRef<HTMLDivElement | null>(null);
	const isDark = theme === 'dark';

	const selectedLabel = useMemo(() => options.find((o) => o.value === value)?.label ?? value, [options, value]);

	useEffect(() => {
		if (!open) return;
		const handlePointerDown = (event: PointerEvent) => {
			const el = rootRef.current;
			if (!el) return;
			if (event.target instanceof Node && !el.contains(event.target)) {
				setOpen(false);
			}
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		};
		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [open]);

	const triggerStyles = cn(
		'inline-flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-xs transition-colors',
		'focus:outline-none focus:ring-2 focus:ring-offset-2',
		isDark
			? 'border-zinc-700 bg-zinc-700 text-zinc-200 focus:ring-zinc-200/20 focus:ring-offset-zinc-900'
			: 'border-zinc-200 bg-zinc-100 text-zinc-700 focus:ring-zinc-900/15 focus:ring-offset-white',
	);

	const menuStyles = cn(
		'absolute right-0 top-full z-50 mt-2 min-w-36 rounded-md border p-1 shadow-lg',
		isDark ? 'border-zinc-700 bg-zinc-800 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900',
	);

	return (
		<div ref={rootRef} className={cn('relative', className)}>
			<button
				type="button"
				className={triggerStyles}
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={id}
				onClick={() => setOpen((prev) => !prev)}
			>
				<span className={cn('inline-flex items-center', isDark ? 'text-zinc-200' : 'text-zinc-600')}>
					{icon}
				</span>
				<span className="sr-only">Selected: {selectedLabel}</span>
				<ChevronDown className={cn('shrink-0 size-3.5', isDark ? 'text-zinc-100' : 'text-zinc-500')} />
			</button>

			{open ? (
				<div id={id} role="menu" className={menuStyles}>
					{options.map((option) => {
						const selected = option.value === value;
						return (
							<button
								type="button"
								key={option.value}
								role="menuitemradio"
								aria-checked={selected}
								className={cn(
									'flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm transition-colors',
									isDark ? 'hover:bg-zinc-700/60' : 'hover:bg-zinc-50',
									selected ? (isDark ? 'bg-zinc-700/70' : 'bg-zinc-100') : undefined,
								)}
								onClick={() => {
									onChange(option.value);
									setOpen(false);
								}}
							>
								<span>{option.label}</span>
							</button>
						);
					})}
				</div>
			) : null}
		</div>
	);
}
