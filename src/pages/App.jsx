import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../shared/Header.jsx';
import Footer from '../shared/Footer.jsx';
import { FavoritesProvider } from '../context/FavoritesContext.jsx';
import { PlayingProvider } from '../context/PlayingContext.jsx';

export default function App() {
	return (
		<FavoritesProvider>
			<PlayingProvider>
				<div className="min-h-full flex flex-col">
					<Header />
					<main className="flex-1 pt-24 pb-12 animate-fade">
						<Outlet />
					</main>
					<Footer />
				</div>
			</PlayingProvider>
		</FavoritesProvider>
	);
}


