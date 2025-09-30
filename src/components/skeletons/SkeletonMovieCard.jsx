import React from 'react';

export default function SkeletonMovieCard() {
	return (
		<div className="card overflow-hidden">
			<div className="aspect-[2/3] bg-white/5 shimmer" />
			<div className="p-3 space-y-2">
				<div className="h-4 w-3/4 bg-white/10 rounded shimmer" />
				<div className="h-3 w-1/3 bg-white/10 rounded shimmer" />
			</div>
		</div>
	);
}









