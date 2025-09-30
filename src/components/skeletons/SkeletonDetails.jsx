import React from 'react';

export default function SkeletonDetails() {
	return (
		<div className="space-y-8">
			<section className="grid md:grid-cols-2 gap-6">
				<div className="aspect-[2/3] bg-white/5 rounded-card shimmer" />
				<div className="space-y-3">
					<div className="h-8 w-3/4 bg-white/10 rounded shimmer" />
					<div className="h-4 w-1/3 bg-white/10 rounded shimmer" />
					<div className="flex gap-2">
						<div className="h-6 w-16 bg-white/10 rounded shimmer" />
						<div className="h-6 w-20 bg-white/10 rounded shimmer" />
					</div>
					<div className="h-24 w-full bg-white/10 rounded shimmer" />
				</div>
			</section>
			<section className="space-y-3">
				<div className="h-6 w-32 bg-white/10 rounded shimmer" />
				<div className="flex gap-3 overflow-x-auto">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="shrink-0 w-32">
							<div className="aspect-square bg-white/10 rounded-card shimmer" />
							<div className="h-3 w-24 mt-2 bg-white/10 rounded shimmer" />
						</div>
					))}
				</div>
			</section>
		</div>
	);
}









