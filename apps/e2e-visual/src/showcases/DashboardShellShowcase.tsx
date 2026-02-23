import { DashboardShell } from 'components/src/kit-components/ui/dashboard-shell';

export function DashboardShellShowcase() {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">DashboardShell</h3>
			<div className="grid gap-4 lg:grid-cols-2">
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">With header</p>
					<DashboardShell
						header={
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">Header Slot</span>
								<span className="text-xs text-muted-foreground">Actions</span>
							</div>
						}
					>
						<div className="rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
							Content area
						</div>
					</DashboardShell>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">No header</p>
					<DashboardShell>
						<div className="rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
							Content only
						</div>
					</DashboardShell>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">No dot grid</p>
					<DashboardShell showDotGrid={false}>
						<div className="rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
							No dot grid background
						</div>
					</DashboardShell>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Not rounded</p>
					<DashboardShell rounded={false}>
						<div className="rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
							No rounded corners
						</div>
					</DashboardShell>
				</div>
			</div>
		</div>
	);
}
