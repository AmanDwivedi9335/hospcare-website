import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="min-h-screen bg-gray-50">
			<header className="sticky top-0 z-40 w-full bg-white shadow-sm">
				<div className="container mx-auto px-4 py-3 flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Skeleton className="h-6 w-32" />
						<div className="hidden md:block">
							<Skeleton className="h-10 w-[400px]" />
						</div>
					</div>
					<Skeleton className="h-10 w-40" />
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<div className="mb-6">
					<Skeleton className="h-6 w-32" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					<div className="space-y-6">
						<Skeleton className="h-[400px] w-full rounded-lg" />
						<div className="flex justify-center space-x-4">
							<Skeleton className="h-16 w-16 rounded" />
							<Skeleton className="h-16 w-16 rounded" />
							<Skeleton className="h-16 w-16 rounded" />
						</div>
					</div>

					<div className="space-y-6">
						<Skeleton className="h-10 w-3/4" />
						<Skeleton className="h-8 w-1/4" />
						<Skeleton className="h-24 w-full" />
						<Skeleton className="h-10 w-40" />
					</div>
				</div>

				<div className="mb-12">
					<Skeleton className="h-8 w-48 mb-6" />
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{[1, 2, 3, 4].map((i) => (
							<Skeleton key={i} className="h-32 w-full rounded-lg" />
						))}
					</div>
				</div>

				<div className="mb-12">
					<Skeleton className="h-8 w-48 mb-6" />
					<Skeleton className="h-32 w-full" />
				</div>

				<div>
					<Skeleton className="h-8 w-48 mb-6" />
					<div className="flex flex-wrap gap-2 mb-8">
						{[1, 2, 3, 4, 5].map((i) => (
							<Skeleton key={i} className="h-8 w-32 rounded-full" />
						))}
					</div>
				</div>

				<div>
					<Skeleton className="h-8 w-48 mb-6" />
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{[1, 2, 3, 4].map((i) => (
							<Skeleton key={i} className="h-64 w-full rounded-lg" />
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
