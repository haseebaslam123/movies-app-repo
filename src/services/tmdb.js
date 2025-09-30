import data from '../data/movies.json';

function paginate(list, page = 1, perPage = 30) {
	const start = (page - 1) * perPage;
	return {
		page,
		results: list.slice(start, start + perPage),
		total_pages: Math.ceil(list.length / perPage) || 1,
		total_results: list.length
	};
}

function normalizeQuery(q) {
	return (q || '').trim().toLowerCase();
}

export const tmdb = {
	poster: (path) => path || '',
	backdrop: (path) => path || '',

	trending: (page = 1) => {
		const sorted = [...data.movies].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
		return Promise.resolve(paginate(sorted, page));
	},
	searchMovies: ({ query, page = 1 }) => {
		const q = normalizeQuery(query);
		const filtered = data.movies.filter((m) => normalizeQuery(m.title).includes(q));
		return Promise.resolve(paginate(filtered, page));
	},
	genres: () => {
		const set = new Map();
		for (const m of data.movies) {
			for (const g of m.genres || []) set.set(g.id, g.name);
		}
		return Promise.resolve({ genres: [...set.entries()].map(([id, name]) => ({ id, name })) });
	},
	discover: ({ sort_by = 'popularity.desc', with_genres, page = 1, upcoming = false }) => {
		let list = data.movies.slice();
		if (with_genres) {
			const ids = new Set(String(with_genres).split(',').map((x) => Number(x)));
			list = list.filter((m) => (m.genres || []).some((g) => ids.has(g.id)));
		}
		if (upcoming) {
			const now = new Date().toISOString().slice(0,10);
			list = list.filter((m) => {
				const release = String(m.release_date || '');
				const notReleased = release !== '' && release > now;
				const unrated = m.vote_average === null || m.vote_average === undefined;
				return notReleased && unrated;
			});
		}
		if (sort_by === 'release_date.desc') list.sort((a,b) => String(b.release_date).localeCompare(String(a.release_date)));
		else if (sort_by === 'vote_average.desc') list.sort((a,b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
		else list.sort((a,b) => (b.popularity ?? 0) - (a.popularity ?? 0));
		return Promise.resolve(paginate(list, page));
	},
	movieDetails: (id) => {
		const m = data.movies.find((x) => String(x.id) === String(id));
		return Promise.resolve(m || null);
	},
	movieCredits: (id) => {
		const m = data.movies.find((x) => String(x.id) === String(id));
		return Promise.resolve({ cast: m?.cast || [], crew: m?.crew || [] });
	},
	movieVideos: (id) => {
		const m = data.movies.find((x) => String(x.id) === String(id));
		return Promise.resolve({ results: m?.videos || [] });
	},
	movieImages: (id) => {
		const m = data.movies.find((x) => String(x.id) === String(id));
		return Promise.resolve({ posters: m?.images || [] });
	},
	movieRecommendations: (id, page = 1) => {
		const m = data.movies.find((x) => String(x.id) === String(id));
		const recs = data.movies.filter((x) => (m?.recommendations || []).includes(x.id));
		return Promise.resolve(paginate(recs, page));
	},
};

export function ratingColor(value) {
	if (value >= 8) return 'text-ink bg-gold';
	if (value >= 5) return 'text-offwhite bg-[color:var(--border)]';
	return 'text-white bg-error/70';
}


