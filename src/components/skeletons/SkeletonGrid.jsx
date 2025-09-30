import React from 'react';
import SkeletonMovieCard from './SkeletonMovieCard.jsx';

export default function SkeletonGrid({ count = 8 }) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			{Array.from({ length: count }).map((_, i) => (
				<SkeletonMovieCard key={i} />
			))}
		</div>
	);
}









