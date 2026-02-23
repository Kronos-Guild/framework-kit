import { autoDiscover, backpack, createClient, metamask, phantom, solflare } from '@solana/client';
import { SolanaProvider } from '@solana/react-hooks';
import { TransactionToastProvider } from 'components/src/kit-components/ui/transaction-toast';
import { Moon, Sun } from 'lucide-react';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { ComponentShowcase } from './sections/ComponentShowcase';
import { Customization } from './sections/Customization';
import { CustomTheme } from './sections/CustomTheme';
import { Dashboard } from './sections/Dashboard';

const walletConnectors = [...phantom(), ...solflare(), ...backpack(), ...metamask(), ...autoDiscover()];

const rpcUrl = import.meta.env.VITE_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

const client = createClient({
	commitment: 'confirmed',
	cluster: 'mainnet-beta',
	rpc: rpcUrl,
	walletConnectors,
});

type Section = 'dashboard' | 'showcase' | 'custom-theme' | 'customization';

export default function App() {
	return (
		<SolanaProvider client={client} query={{ suspense: true }}>
			<TransactionToastProvider>
				<AppShell />
			</TransactionToastProvider>
		</SolanaProvider>
	);
}

function AppShell() {
	const [section, setSection] = useState<Section>('dashboard');
	const [isDark, setIsDark] = useState(true);

	const toggleTheme = useCallback(() => {
		setIsDark((prev) => {
			const next = !prev;
			document.documentElement.classList.toggle('dark', next);
			return next;
		});
	}, []);

	// Set dark mode on mount
	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	const tabs: { id: Section; label: string }[] = [
		{ id: 'dashboard', label: 'Dashboard' },
		{ id: 'showcase', label: 'Component Showcase' },
		{ id: 'custom-theme', label: 'Custom Theme' },
		{ id: 'customization', label: 'Customization' },
	];

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Top nav */}
			<nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
					<div className="flex items-center gap-1">
						{tabs.map((tab) => (
							<button
								type="button"
								key={tab.id}
								onClick={() => setSection(tab.id)}
								className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
									section === tab.id
										? 'bg-primary text-primary-foreground'
										: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>
					<button
						type="button"
						onClick={toggleTheme}
						className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
						aria-label="Toggle dark mode"
					>
						{isDark ? <Sun size={16} /> : <Moon size={16} />}
					</button>
				</div>
			</nav>

			{/* Content */}
			<main className="mx-auto max-w-7xl px-4 py-8">
				<Suspense
					fallback={
						<div className="flex items-center justify-center py-20 text-muted-foreground">Loading...</div>
					}
				>
					{section === 'dashboard' && <Dashboard />}
					{section === 'showcase' && <ComponentShowcase />}
					{section === 'custom-theme' && <CustomTheme />}
					{section === 'customization' && <Customization />}
				</Suspense>
			</main>
		</div>
	);
}
