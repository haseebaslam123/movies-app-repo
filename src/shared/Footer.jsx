import React from 'react';

export default function Footer() {
	return (
		<footer className="border-t border-[color:var(--border)] bg-ink/80">
			<div className="container-page py-8 text-sm text-muted flex flex-col sm:flex-row items-center justify-between gap-4">
				<p>© {new Date().getFullYear()} Movie Explorer</p>
				<div className="flex items-center gap-4">
					<a className="hover:text-offwhite" href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB API</a>
					<a className="hover:text-offwhite" href="#" target="_blank" rel="noreferrer">Source Code</a>
				</div>
			</div>
		</footer>
	);
}


