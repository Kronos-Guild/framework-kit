import { Skeleton } from 'components/src/kit-components/ui/skeleton';

export function SkeletonShowcase() {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">Skeleton</h3>
			<div className="grid gap-4 sm:grid-cols-3">
				<div className="space-y-2">
					<p className="text-sm text-muted-foreground">Default</p>
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
				</div>
				<div className="space-y-2">
					<p className="text-sm text-muted-foreground">Custom size</p>
					<Skeleton className="h-12 w-12 rounded-full" />
					<Skeleton className="h-8 w-32" />
				</div>
				<div className="space-y-2">
					<p className="text-sm text-muted-foreground">Card shaped</p>
					<Skeleton className="h-32 w-full rounded-xl" />
				</div>
			</div>
		</div>
	);
}
