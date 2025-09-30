import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdb } from '../services/tmdb.js';
import Modal from '../components/ui/Modal.jsx';
import Carousel from '../components/Carousel.jsx';
import SkeletonDetails from '../components/skeletons/SkeletonDetails.jsx';
import { usePlaying } from '../context/PlayingContext.jsx';

export default function MovieDetails() {
	const { id } = useParams();
	const { setNowPlayingId } = usePlaying();
	const [details, setDetails] = useState(null);
	const [credits, setCredits] = useState(null);
	const [videos, setVideos] = useState(null);
	const [recs, setRecs] = useState([]);
	const [openTrailer, setOpenTrailer] = useState(false);

	useEffect(() => {
		// Scroll to top when component mounts
		window.scrollTo(0, 0);
		
		let ignore = false;
		async function load() {
			try {
				const [d, c, v, r] = await Promise.all([
					tmdb.movieDetails(id),
					tmdb.movieCredits(id),
					tmdb.movieVideos(id),
					tmdb.movieRecommendations(id)
				]);
				if (!ignore) {
					setDetails(d);
					setCredits(c);
					setVideos(v);
					setRecs(r.results || []);
				}
			} catch {}
		}
		load();
		return () => { ignore = true; };
	}, [id]);

	const trailer = useMemo(() => videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube'), [videos]);
	const cast = credits?.cast?.slice(0, 12) || [];
	const director = credits?.crew?.find((p) => p.job === 'Director');

	if (!details) return <SkeletonDetails />;

	return (
		<div className="space-y-8">
			<section className="grid md:grid-cols-2 gap-6">
				<div className="aspect-[2/3] bg-black/30 rounded-card overflow-hidden">
					<img src={tmdb.poster(details.poster_path, 'w500')} alt={details.title ? `Poster for ${details.title}` : 'Poster'} className="w-full h-full object-cover" />
				</div>
				<div className="space-y-3">
					<h1 className="font-head text-3xl">{details.title}</h1>
					<div className="text-muted">{details.release_date?.slice(0,4)} • {details.runtime}m</div>
					<div className="flex flex-wrap gap-2">{details.genres?.map((g) => <span key={g.id} className="chip">{g.name}</span>)}</div>
					<div className="flex items-center gap-3">
					<button className="px-4 py-2 rounded-card bg-accent text-white" onClick={() => { setNowPlayingId(details.id); setOpenTrailer(true); }} disabled={!trailer}>Watch Trailer</button>
						{director && <span className="text-sm text-muted">Director: {director.name}</span>}
					</div>
					<p className="text-offwhite/90">{details.overview}</p>
				</div>
			</section>
			<section className="space-y-3">
				<h2 className="font-head text-2xl">Cast</h2>
				<div className="overflow-x-auto flex gap-3">
					{cast.map((p) => (
						<div key={p.cast_id} className="shrink-0 w-32">
							<div className="aspect-square rounded-card overflow-hidden bg-black/30">
								<img loading="lazy" src={p.profile_path ? tmdb.poster(p.profile_path, 'w185') : ''} alt={p.name} className="w-full h-full object-cover" />
							</div>
							<div className="mt-1 text-sm line-clamp-2">{p.name}</div>
							<div className="text-xs text-muted line-clamp-2">{p.character}</div>
						</div>
					))}
				</div>
			</section>
			<section className="space-y-3">
				<h2 className="font-head text-2xl">Similar Movies</h2>
				<Carousel items={recs} />
			</section>
			<Modal open={openTrailer} onClose={() => setOpenTrailer(false)} labelledBy="trailer-title">
				<div className="relative aspect-video w-full">
					{trailer ? (
						<iframe
							title="Trailer"
							className="w-full h-full"
							src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&mute=1`}
							allow="autoplay; encrypted-media"
							allowFullScreen
						/>
					) : (
						<div className="grid place-items-center text-muted h-full">No trailer available</div>
					)}
				</div>
			</Modal>
		</div>
	);
}


