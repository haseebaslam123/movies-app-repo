import React from 'react';

export default function About() {
	return (
		<div className="prose prose-invert max-w-none">
			<h1 className="font-head text-3xl">About Movie Explorer</h1>
			<p>Movie Explorer is a modern, cinematic web experience designed to help you discover films quickly and delightfully. It features a streamlined search with suggestions, a rich details view with trailers and cast, and a lightweight favorites system so you can curate what to watch next.</p>
			<p>The interface emphasizes clarity and speed. A dark, high-contrast theme lets posters and media take center stage, while thoughtful animations bring polish without getting in the way. The layout is responsive from mobile to desktop with accessible navigation for keyboard and screen readers.</p>
			<ul>
				<li>Search and instant suggestions</li>
				<li>Trending carousel and horizontal sliders</li>
				<li>Details page with cast and trailer modal</li>
				<li>Favorites with one-click toggling</li>
				<li>Skeleton loaders and smooth transitions</li>
			</ul>
			<p>Built with React, React Router, and Tailwind CSS. This portfolio-friendly build uses a local dataset to demonstrate UX, state management, and component design without external dependencies.</p>
		</div>
	);
}


