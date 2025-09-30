import React from 'react';

const QUICK = [
	{ key: 'all', label: 'All', sort_by: 'popularity.desc' },
	{ key: 'now_playing', label: 'Now Playing' },
	{ key: 'popular', label: 'Popular', sort_by: 'popularity.desc' },
	{ key: 'top_rated', label: 'Top Rated', sort_by: 'vote_average.desc' },
	{ key: 'upcoming', label: 'Upcoming', upcoming: true },
];

export default function FilterChips({ activeKey, onSelect }) {
	return (
		<div className="flex flex-wrap gap-2">
			{QUICK.map((q) => (
				<button
					key={q.key}
					onClick={() => onSelect?.(q)}
					className={`chip ${activeKey === q.key ? 'bg-accent text-white' : ''}`}
					aria-pressed={activeKey === q.key}
				>
					{q.label}
				</button>
			))}
		</div>
	);
}


