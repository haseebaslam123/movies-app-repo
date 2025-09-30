import React, { useEffect, useRef } from 'react';

export default function Modal({ open, onClose, children, labelledBy }) {
	const firstFocusable = useRef(null);
	useEffect(() => {
		function onKey(e) { if (e.key === 'Escape') onClose?.(); }
		if (open) document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open, onClose]);

	useEffect(() => {
		if (open) firstFocusable.current?.focus();
	}, [open]);

	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50" aria-modal="true" role="dialog" aria-labelledby={labelledBy}>
			<div className="absolute inset-0 bg-black/70 backdrop-blur" onClick={onClose} />
			<div className="absolute inset-0 p-4 sm:p-8 grid place-items-center">
				<div className="w-full max-w-4xl bg-card rounded-card shadow-card border border-[color:var(--border)] overflow-hidden">
					<div className="flex justify-end p-2">
						<button ref={firstFocusable} onClick={onClose} aria-label="Close" className="w-9 h-9 rounded bg-white/10 hover:bg-white/20">✕</button>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}


