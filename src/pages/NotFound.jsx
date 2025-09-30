import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<div className="text-center py-24">
			<h1 className="font-head text-4xl mb-4">404 — Not Found</h1>
			<p className="text-muted mb-6">We couldn't find that page.</p>
			<Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent text-white">Go Home</Link>
		</div>
	);
}


