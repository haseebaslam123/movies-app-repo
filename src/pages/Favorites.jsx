import React from 'react';
import MovieGrid from '../components/MovieGrid.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function Favorites() {
	const { favorites } = useFavorites();
	return (
		<div className="space-y-4">
			<h1 className="font-head text-3xl">Your Favorites</h1>
			{favorites.length ? (
				<MovieGrid movies={favorites} />
			) : (
				<p className="text-muted">Your favorites are empty — add movies by clicking the heart.</p>
			)}
		</div>
	);
}


