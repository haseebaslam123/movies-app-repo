import { useState } from 'react';

// Simplified: behaves like useState without localStorage persistence per updated spec
export default function useLocalStorage(_key, initialValue) {
	return useState(initialValue);
}


