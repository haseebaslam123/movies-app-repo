import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { tmdb } from '../services/tmdb.js';

export default function Carousel({ items = [] }) {
	const ref = useRef(null);
	function scrollBy(delta) { ref.current?.scrollBy({ left: delta, behavior: 'smooth' }); }
	if (!items.length) return null;
	return (
		<div className="relative">
			<div className="flex items-center gap-2 absolute -left-2 top-1/2 -translate-y-1/2 z-10">
				<button aria-label="Prev" className="w-8 h-8 rounded-full bg-white/10" onClick={() => scrollBy(-320)}>{'<'}</button>
			</div>
			<div className="flex items-center gap-2 absolute -right-2 top-1/2 -translate-y-1/2 z-10">
				<button aria-label="Next" className="w-8 h-8 rounded-full bg-white/10" onClick={() => scrollBy(320)}>{'>'}</button>
			</div>
			<div ref={ref} className="overflow-x-auto no-scrollbar flex gap-3 pr-2">
				{items.map((m) => (
					<Link to={`/movie/${m.id}`} key={m.id} className="shrink-0 w-36">
						<div className="aspect-[2/3] rounded-card overflow-hidden bg-black/30">
							<img loading="lazy" src={tmdb.poster(m.poster_path, 'w342')} alt={m.title ? `Poster for ${m.title}` : 'Poster'} className="w-full h-full object-cover" />
						</div>
						<div className="mt-2 text-sm line-clamp-2">{m.title}</div>
					</Link>
				))}
			</div>
		</div>
	);
}









