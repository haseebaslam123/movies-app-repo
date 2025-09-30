import React, { createContext, useContext, useMemo, useState } from 'react';

const PlayingContext = createContext(null);

export function PlayingProvider({ children }) {
	const [nowPlayingId, setNowPlayingId] = useState(null);
	const value = useMemo(() => ({ nowPlayingId, setNowPlayingId }), [nowPlayingId]);
	return <PlayingContext.Provider value={value}>{children}</PlayingContext.Provider>;
}

export function usePlaying() {
	const ctx = useContext(PlayingContext);
	if (!ctx) throw new Error('usePlaying must be used within PlayingProvider');
	return ctx;
}









