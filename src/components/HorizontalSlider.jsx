import React, { useRef } from 'react';

export default function HorizontalSlider({ children, leftOffset = 'left-4', rightOffset = 'right-4' }) {
	const ref = useRef(null);
	function by(dx) { ref.current?.scrollBy({ left: dx, behavior: 'smooth' }); }
	return (
		<div className="relative">
			<button
				aria-label="Prev"
				className={`absolute ${leftOffset} top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 hover:border-white/40`}
				onClick={() => by(-360)}
			>{'<'}</button>
			<button
				aria-label="Next"
				className={`absolute ${rightOffset} top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 hover:border-white/40`}
				onClick={() => by(360)}
			>{'>'}</button>
			<div ref={ref} className="overflow-x-hidden no-scrollbar flex gap-3 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory">
				{children}
			</div>
		</div>
	);
}


