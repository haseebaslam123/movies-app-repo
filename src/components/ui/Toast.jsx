import React, { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', duration = 1800, onDone }) {
	const [open, setOpen] = useState(Boolean(message));
	useEffect(() => {
		if (!message) return;
		setOpen(true);
		const id = setTimeout(() => { setOpen(false); onDone?.(); }, duration);
		return () => clearTimeout(id);
	}, [message, duration, onDone]);

	if (!open || !message) return null;
	const bg = type === 'error' ? 'bg-error' : 'bg-success';
	return (
		<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
			<div className={`text-ink px-4 py-2 rounded shadow ${bg}`}>{message}</div>
		</div>
	);
}









