import React, { createContext, useContext, useMemo, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
	const [favorites, setFavorites] = useLocalStorage('favorites', []);

	const isFavorite = useCallback((id) => favorites.some((m) => m.id === id), [favorites]);

	const toggleFavorite = useCallback((movie) => {
		setFavorites((prev) => {
			const exists = prev.some((m) => m.id === movie.id);
			if (exists) return prev.filter((m) => m.id !== movie.id);
			return [...prev, { id: movie.id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average }];
		});
	}, [setFavorites]);

	const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite }), [favorites, isFavorite, toggleFavorite]);

	return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
	const ctx = useContext(FavoritesContext);
	if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
	return ctx;
}









