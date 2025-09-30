import React, { useEffect, useRef, useState } from 'react';
import { tmdb } from '../services/tmdb.js';
import heroData from '../data/heroImages.json';

export default function HeroSlider({ items = [], intervalMs = 2000 }) {
	const [index, setIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const timer = useRef(null);

	useEffect(() => {
		if (!items.length) return;
		timer.current = setInterval(() => {
			setIsTransitioning(true);
			setTimeout(() => {
				setIndex((i) => (i + 1) % items.length);
				setIsTransitioning(false);
			}, 300);
		}, Math.max(1000, Math.min(intervalMs, 3000)));
		return () => clearInterval(timer.current);
	}, [items, intervalMs]);

	const bgList = (items && items.length >= 20) ? items : heroData.images.map((url, i) => ({ id: `bg-${i}`, title: 'Adventure', backdrop_path: url, poster_path: url }));
	const toShow = bgList[index % bgList.length];
	if (!toShow) return null;

	return (
		<div className="absolute inset-0">
			<img 
				src={tmdb.backdrop(toShow.backdrop_path || toShow.poster_path)} 
				alt={toShow.title} 
				className={`w-full h-full object-cover transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`} 
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
		</div>
	);
}


