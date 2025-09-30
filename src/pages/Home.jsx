import React, { useEffect, useMemo, useRef, useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import FilterChips from '../components/FilterChips.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import SkeletonGrid from '../components/skeletons/SkeletonGrid.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import HorizontalSlider from '../components/HorizontalSlider.jsx';
import Toast from '../components/ui/Toast.jsx';
import { tmdb } from '../services/tmdb.js';
import { usePlaying } from '../context/PlayingContext.jsx';
import MovieCard from '../components/MovieCard.jsx';

export default function Home() {
	const [query, setQuery] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [active, setActive] = useState('all');
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const [trending, setTrending] = useState([]);
	const [toast, setToast] = useState('');
	const [searchedMovie, setSearchedMovie] = useState(null);
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const { nowPlayingId } = usePlaying();
	const nowRef = useRef(null);
	const popularRef = useRef(null);
	const upcomingRef = useRef(null);
	const topRatedRef = useRef(null);

	useEffect(() => {
		let ignore = false;
		async function load() {
			try {
				const [trendingData, popularData, topRatedData, upcomingData, nowPlayingData] = await Promise.all([
					tmdb.trending(),
					tmdb.discover({ sort_by: 'popularity.desc', page: 1 }),
					tmdb.discover({ sort_by: 'vote_average.desc', page: 1 }),
					tmdb.discover({ sort_by: 'release_date.desc', upcoming: true, page: 1 }),
					tmdb.discover({ sort_by: 'popularity.desc', page: 1 })
				]);
				if (!ignore) {
					setTrending(trendingData.results || []);
					setPopularMovies(popularData.results || []);
					setTopRatedMovies(topRatedData.results || []);
					setUpcomingMovies(upcomingData.results || []);
					setNowPlayingMovies(nowPlayingData.results || []);
				}
			} catch {}
		}
		load();
		return () => { ignore = true; };
	}, []);

	async function fetchPage(nextPage = 1, replace = false) {
		setLoading(true);
		try {
			let data;
			if (searchQuery) {
				// If searchQuery matches an item title exactly, return only that item
				const res = await tmdb.searchMovies({ query: searchQuery, page: 1 });
				const exact = res.results?.find((r) => r.title.toLowerCase() === searchQuery.toLowerCase());
				if (exact) {
					setSearchedMovie(exact);
					data = { page: 1, results: [], total_pages: 1, total_results: 0 };
				} else {
					setSearchedMovie(null);
					data = await tmdb.searchMovies({ query: searchQuery, page: nextPage });
				}
			} else if (active !== 'all') {
				setSearchedMovie(null);
				if (active === 'now_playing') {
					// Keep the original nowPlayingMovies, don't change them
					data = { page: 1, results: [], total_pages: 1, total_results: 0 };
				} else if (active === 'popular') {
					data = await tmdb.discover({ sort_by: 'popularity.desc', page: nextPage });
				} else if (active === 'top_rated') {
					data = await tmdb.discover({ sort_by: 'vote_average.desc', page: nextPage });
				} else if (active === 'upcoming') {
					data = await tmdb.discover({ sort_by: 'release_date.desc', upcoming: true, page: nextPage });
				} else {
					data = await tmdb.discover({ sort_by: 'popularity.desc', page: nextPage });
				}
			} else {
				setSearchedMovie(null);
				data = await tmdb.discover({ sort_by: 'popularity.desc', page: nextPage });
			}
			setResults((prev) => replace ? (data.results || []) : [...prev, ...(data.results || [])]);
			setHasMore(data.page < data.total_pages);
			setPage(nextPage);
		} catch {
			// noop for now
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		// reset when searchQuery or filter changes
		setResults([]);
		setPage(1);
		setHasMore(true);
		setSearchedMovie(null);
		fetchPage(1, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery, active]);

	const canLoadMore = useMemo(() => hasMore && !loading, [hasMore, loading]);

return (
		<div className="space-y-8">
			<section className="relative h-[46vh] md:h-[64vh] full-bleed">
				<HeroSlider items={trending.slice(0, 6)} />
				<div className="container-page absolute inset-x-0 bottom-6">
					<h1 className="font-head text-4xl md:text-5xl mb-3">Discover Movies</h1>
					<p className="text-muted">Search, watch trailers, save favorites.</p>
				</div>
			</section>
			<section className="container-page space-y-4">
				<SearchBar value={query} onChange={setQuery} onSubmit={setSearchQuery} />
				<FilterChips activeKey={active} onSelect={(q) => {
					setActive(q.key);
					// Clear search when clicking "All"
					if (q.key === 'all') {
						setQuery('');
						setSearchQuery('');
						setSearchedMovie(null);
					}
					requestAnimationFrame(() => {
						if (q.key === 'now_playing') nowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
						else if (q.key === 'popular') popularRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
						else if (q.key === 'upcoming') upcomingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
						else if (q.key === 'top_rated') topRatedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
					});
				}} />
			</section>
			{searchedMovie && (
				<section className="container-page space-y-3">
					<h2 className="font-head text-2xl">Search Result</h2>
					<div className="flex justify-center">
						<div className="w-44">
							<MovieCard movie={searchedMovie} onFavorite={(msg) => setToast(msg)} />
						</div>
					</div>
				</section>
			)}
			{trending.length > 0 && (
				<section className="space-y-3">
  <div className="container-page">
    <h2 className="font-head text-2xl">Trending</h2>
  </div>
  <div className="container-page">
    <HorizontalSlider>
      {Array.from(new Map(trending.map(item => [item.id, item])).values()).map((m) => (
        <div key={m.id} className="shrink-0 w-44 snap-start">
          <MovieCard movie={m} onFavorite={(msg) => setToast(msg)} />
        </div>
      ))}
    </HorizontalSlider>
  </div>
</section>

			)}
			<section ref={popularRef} className="space-y-3">
  <div className="container-page">
    <h2 className="font-head text-2xl">Popular</h2>
  </div>
  <div className="container-page">
    <HorizontalSlider>
      {popularMovies.map((m) => (
        <div key={m.id} className="shrink-0 w-44 snap-start">
          <MovieCard movie={m} onFavorite={(msg) => setToast(msg)} />
        </div>
      ))}
    </HorizontalSlider>
  </div>
</section>

			<section ref={topRatedRef} className="space-y-3">
  <div className="container-page">
    <h2 className="font-head text-2xl">Top Rated</h2>
  </div>
  <div className="container-page">
    <HorizontalSlider>
      {topRatedMovies.map((m) => (
        <div key={m.id} className="shrink-0 w-44 snap-start">
          <MovieCard movie={m} onFavorite={(msg) => setToast(msg)} />
        </div>
      ))}
    </HorizontalSlider>
  </div>
</section>

			<section ref={upcomingRef} className="space-y-3"> 
  <div className="container-page"> 
    <h2 className="font-head text-2xl">Upcoming</h2>
  </div>

  <HorizontalSlider leftOffset="left-20" rightOffset="right-16">
    {upcomingMovies.map((m, index) => (
      <div 
        key={m.id} 
        className={`shrink-0 w-44 snap-start ${index === 0 ? 'ml-8' : ''}`} 
      >
        <MovieCard movie={m} onFavorite={(msg) => setToast(msg)} />
      </div>
    ))}
  </HorizontalSlider>
</section>


			<section ref={nowRef} className="space-y-3">
  <div className="container-page">
    <h2 className="font-head text-2xl">Now Playing</h2>
  </div>
  <div className="container-page">
    <HorizontalSlider>
      {nowPlayingMovies.map((m) => (
        <div key={m.id} className="shrink-0 w-44 snap-start">
          <MovieCard movie={m} onFavorite={(msg) => setToast(msg)} />
        </div>
      ))}
    </HorizontalSlider>
  </div>
</section>

			<Toast message={toast} onDone={() => setToast('')} />
		</div>
	);
}


