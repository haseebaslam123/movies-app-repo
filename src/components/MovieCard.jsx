import React from 'react';
import { Link } from 'react-router-dom';
import { tmdb, ratingColor } from '../services/tmdb.js';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function MovieCard({ movie, onFavorite }) {
	const { isFavorite, toggleFavorite } = useFavorites();
	const fav = isFavorite(movie.id);
	return (
		<div className="card overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl">
			<Link to={`/movie/${movie.id}`} className="block">
				<div className="aspect-[2/3] bg-black/30">
					<img
						loading="lazy"
						src={tmdb.poster(movie.poster_path, 'w342')}
						alt={movie.title ? `Poster for ${movie.title}` : 'Poster'}
						className="w-full h-full object-cover"
					/>
				</div>
			</Link>
			<div className="p-3">
				<div className="flex items-start justify-between gap-2">
					<div>
						<h3 className="font-medium leading-tight line-clamp-2">{movie.title}</h3>
						<div className="text-xs text-muted">{movie.release_date?.slice(0,4) || '—'}</div>
					</div>
					<button aria-label={fav ? 'Remove from favorites' : 'Add to favorites'} className={`w-9 h-9 rounded-full grid place-items-center ${fav ? 'bg-accent' : 'bg-white/10'}`} onClick={() => { toggleFavorite(movie); onFavorite?.(fav ? 'Removed from Favorites' : 'Added to Favorites'); }}>
						<span className="sr-only">Favorite</span>
						<svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" className="text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/></svg>
					</button>
				</div>
				<div className="mt-2">
					<span className={`text-xs px-2 py-1 rounded ${ratingColor(movie.vote_average)}`}>{(movie.vote_average ?? 0).toFixed(1)}</span>
				</div>
			</div>
		</div>
	);
}









