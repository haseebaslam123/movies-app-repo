import React, { useEffect, useMemo, useRef, useState } from 'react';
import useDebounce from '../hooks/useDebounce.js';
import { tmdb } from '../services/tmdb.js';

export default function SearchBar({ value, onChange, onSubmit }) {
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const inputRef = useRef(null);
	const debounced = useDebounce(value, 400);

	useEffect(() => {
		let ignore = false;
		async function run() {
			if (!debounced || debounced.length < 2) { setSuggestions([]); return; }
			try {
				setLoading(true);
				const data = await tmdb.searchMovies({ query: debounced, page: 1 });
				if (!ignore) setSuggestions(data.results?.slice(0, 6) || []);
			} catch {
				if (!ignore) setSuggestions([]);
			} finally { if (!ignore) setLoading(false); }
		}
		run();
		return () => { ignore = true; };
	}, [debounced]);

	useEffect(() => {
		function onDocClick(e) { if (!inputRef.current?.parentElement?.contains(e.target)) setOpen(false); }
		document.addEventListener('click', onDocClick);
		return () => document.removeEventListener('click', onDocClick);
	}, []);

	const hasSuggestions = useMemo(() => suggestions.length > 0, [suggestions]);

	return (
		<div className="relative w-full" ref={inputRef}>
			<form onSubmit={(e) => { e.preventDefault(); onSubmit?.(value); setOpen(false); }} className="flex gap-2">
				<input
					value={value}
					onChange={(e) => { onChange?.(e.target.value); setOpen(true); }}
					placeholder="Search movies, actors, keywords…"
					className="w-full px-4 py-3 rounded-card bg-card border border-[color:var(--border)] focus:outline-none focus:ring-2 focus:ring-accent text-offwhite"
					aria-label="Search"
				/>
				<button type="submit" className="px-4 rounded-card bg-accent text-white">Search</button>
			</form>
			{open && (loading || hasSuggestions) && (
				<div className="absolute z-20 mt-2 w-full bg-card rounded-card border border-[color:var(--border)] shadow-card overflow-hidden">
					{loading && <div className="px-4 py-3 text-muted">Searching…</div>}
					{!loading && suggestions.map((s) => (
						<button key={s.id} onClick={() => { onChange?.(s.title); setOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-white/5 focus:bg-white/10">
							<div className="font-medium">{s.title}</div>
							<div className="text-xs text-muted">{s.release_date?.slice(0,4) || '—'}</div>
						</button>
					))}
					{!loading && !hasSuggestions && debounced && (
						<div className="px-4 py-3 text-muted">No results — try another keyword.</div>
					)}
				</div>
			)}
		</div>
	);
}


