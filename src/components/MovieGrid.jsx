import React from 'react';
import MovieCard from './MovieCard.jsx';

export default function MovieGrid({ movies, onFavorite }) {
	if (!movies?.length) return (
		<div className="text-center text-muted py-16">No results — try another keyword or clear filters.</div>
	);
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			{movies.map((m) => (
				<MovieCard key={m.id} movie={m} onFavorite={onFavorite} />
			))}
		</div>
	);
}









