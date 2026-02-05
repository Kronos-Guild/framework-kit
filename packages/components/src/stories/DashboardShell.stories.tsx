import type { Meta, StoryObj } from '@storybook/react';
import { DashboardShell } from '../kit-components/ui/dashboard-shell';
import { Skeleton } from '../kit-components/ui/skeleton';

const meta: Meta<typeof DashboardShell> = {
	title: 'Kit Components/Layout/DashboardShell',
	component: DashboardShell,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A page-level layout container for Solana dApp dashboards. Provides consistent structure with optional header slot, dot grid background pattern, and theme support.',
			},
		},
	},
	argTypes: {
		theme: {
			description: 'Color theme for the shell',
			control: 'select',
			options: ['light', 'dark'],
			table: {
				defaultValue: { summary: 'light' },
				type: { summary: "'light' | 'dark'" },
			},
		},
		header: {
			description: 'Optional header content (navigation, wallet button, etc.)',
			control: false,
			table: {
				type: { summary: 'React.ReactNode' },
			},
		},
		children: {
			description: 'Main content area',
			control: false,
			table: {
				type: { summary: 'React.ReactNode' },
			},
		},
		showDotGrid: {
			description: 'Show the dot grid background pattern',
			control: 'boolean',
			table: {
				defaultValue: { summary: 'true' },
				type: { summary: 'boolean' },
			},
		},
		className: {
			description: 'Additional CSS classes',
			control: 'text',
			table: {
				type: { summary: 'string' },
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// for default, basic shell with placeholder content
export const Default: Story = {
	args: {
		children: (
			<div className="flex items-center justify-center h-64">
				<p className="text-zinc-500">Main content area</p>
			</div>
		),
	},
};

// for light and dark theme variants

export const Light: Story = {
	name: 'Theme: Light',
	args: {
		theme: 'light',
		children: (
			<div className="flex items-center justify-center h-64">
				<p className="text-zinc-500">Light theme (default)</p>
			</div>
		),
	},
};

export const Dark: Story = {
	name: 'Theme: Dark',
	args: {
		theme: 'dark',
		children: (
			<div className="flex items-center justify-center h-64">
				<p className="text-zinc-400">Dark theme</p>
			</div>
		),
	},
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

// for variants with header, dot grid, and without header

export const WithHeader: Story = {
	name: 'With Header',
	args: {
		header: (
			<>
				<div className="text-zinc-700 font-semibold">My dApp</div>
				<button type="button" className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm">
					Connect Wallet
				</button>
			</>
		),
		children: (
			<div className="flex items-center justify-center h-64">
				<p className="text-zinc-500">Content below header</p>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'The header slot accepts any React content. It renders in a flex container with space-between alignment.',
			},
		},
	},
};

export const WithHeaderDark: Story = {
	name: 'With Header (Dark)',
	args: {
		theme: 'dark',
		header: (
			<>
				<div className="text-zinc-200 font-semibold">My dApp</div>
				<button type="button" className="px-4 py-2 bg-white text-zinc-900 rounded-lg text-sm">
					Connect Wallet
				</button>
			</>
		),
		children: (
			<div className="flex items-center justify-center h-64">
				<p className="text-zinc-400">Content below header</p>
			</div>
		),
	},
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

export const WithoutHeader: Story = {
	name: 'Without Header',
	args: {
		children: (
			<div className="flex items-center justify-center h-64">
				<p className="text-zinc-500">No header - content starts at top</p>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'When no header prop is provided, the header element is not rendered.',
			},
		},
	},
};

export const WithDotGrid: Story = {
	name: 'With Dot Grid (Default)',
	args: {
		showDotGrid: true,
		children: (
			<div className="flex items-center justify-center h-64">
				<p className="text-zinc-500">Dot grid pattern visible in background</p>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'The dot grid background pattern is shown by default. The pattern uses subtle dots at 3% opacity.',
			},
		},
	},
};

export const WithoutDotGrid: Story = {
	name: 'Without Dot Grid',
	args: {
		showDotGrid: false,
		children: (
			<div className="flex items-center justify-center h-64">
				<p className="text-zinc-500">Solid background, no dot pattern</p>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Set showDotGrid={false} for a solid background without the pattern.',
			},
		},
	},
};

// for realistic usage with wallet info and cards

export const DashboardWithCards: Story = {
	name: 'Composition: Dashboard with Cards',
	args: {
		header: (
			<>
				<div className="text-zinc-700 font-semibold">Solana Wallet</div>
				<div className="flex items-center gap-2">
					<span className="text-sm text-zinc-500">Mainnet</span>
					<button type="button" className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm">
						6DM1...1D4K
					</button>
				</div>
			</>
		),
		children: (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
				{/* Balance Card Mock */}
				<div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200">
					<p className="text-sm text-zinc-500 mb-1">Total Balance</p>
					<p className="text-3xl font-bold text-zinc-900">$34.81</p>
					<div className="mt-4 space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-zinc-500">USDC</span>
							<span className="text-zinc-700">$15.50</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-zinc-500">USDT</span>
							<span className="text-zinc-700">$10.18</span>
						</div>
					</div>
				</div>
				{/* Swap Widget Mock */}
				<div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200">
					<p className="text-sm text-zinc-500 mb-4">Swap</p>
					<div className="space-y-3">
						<div className="bg-zinc-50 rounded-lg p-3">
							<p className="text-xs text-zinc-400">Pay</p>
							<p className="text-xl font-semibold text-zinc-900">1.21 SOL</p>
						</div>
						<div className="bg-zinc-50 rounded-lg p-3">
							<p className="text-xs text-zinc-400">Receive</p>
							<p className="text-xl font-semibold text-zinc-900">1324.13 USDC</p>
						</div>
					</div>
				</div>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'A realistic dashboard layout with header containing wallet info and main content with cards.',
			},
		},
	},
};

export const DashboardWithCardsDark: Story = {
	name: 'Composition: Dashboard with Cards (Dark)',
	args: {
		theme: 'dark',
		header: (
			<>
				<div className="text-zinc-200 font-semibold">Solana Wallet</div>
				<div className="flex items-center gap-2">
					<span className="text-sm text-zinc-400">Mainnet</span>
					<button type="button" className="px-4 py-2 bg-white text-zinc-900 rounded-lg text-sm">
						6DM1...1D4K
					</button>
				</div>
			</>
		),
		children: (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
				{/* Balance Card Mock */}
				<div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
					<p className="text-sm text-zinc-400 mb-1">Total Balance</p>
					<p className="text-3xl font-bold text-white">$34.81</p>
					<div className="mt-4 space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-zinc-400">USDC</span>
							<span className="text-zinc-200">$15.50</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-zinc-400">USDT</span>
							<span className="text-zinc-200">$10.18</span>
						</div>
					</div>
				</div>
				{/* Swap Widget Mock */}
				<div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
					<p className="text-sm text-zinc-400 mb-4">Swap</p>
					<div className="space-y-3">
						<div className="bg-zinc-900 rounded-lg p-3">
							<p className="text-xs text-zinc-500">Pay</p>
							<p className="text-xl font-semibold text-white">1.21 SOL</p>
						</div>
						<div className="bg-zinc-900 rounded-lg p-3">
							<p className="text-xs text-zinc-500">Receive</p>
							<p className="text-xl font-semibold text-white">1324.13 USDC</p>
						</div>
					</div>
				</div>
			</div>
		),
	},
	parameters: {
		backgrounds: { default: 'dark' },
		docs: {
			description: {
				story: 'Dark theme variant of the dashboard layout.',
			},
		},
	},
};

export const LoadingState: Story = {
	name: 'Composition: Loading State',
	args: {
		header: (
			<>
				<Skeleton className="h-6 w-32" />
				<Skeleton className="h-10 w-28 rounded-lg" />
			</>
		),
		children: (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
				<div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200 space-y-4">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-8 w-32" />
					<div className="space-y-2 mt-4">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
					</div>
				</div>
				<div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200 space-y-4">
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-16 w-full rounded-lg" />
					<Skeleton className="h-16 w-full rounded-lg" />
				</div>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'DashboardShell works well with Skeleton components for loading states.',
			},
		},
	},
};

// for playground to experiment with different prop combinations

export const Playground: Story = {
	name: 'Playground',
	args: {
		theme: 'light',
		showDotGrid: false,
		header: (
			<>
				<div className="text-zinc-700 font-semibold">My dApp</div>
				<button type="button" className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm">
					Connect Wallet
				</button>
			</>
		),
		children: (
			<div className="flex items-center justify-center h-64">
				<p className="text-zinc-500">Use the controls panel to experiment</p>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Use the controls panel below to experiment with different prop combinations.',
			},
		},
	},
};
