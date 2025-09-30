/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx}"
	],
	theme: {
		extend: {
			colors: {
				ink: "#0B1020",
				card: "#0F1724",
				offwhite: "#E6EEF5",
				muted: "#A7B0C0",
				accent: "#E50914",
				gold: "#FFD166",
				success: "#4ADE80",
				error: "#FF6B6B",
				border: "rgba(230,238,245,0.06)"
			},
			boxShadow: {
				card: "0 8px 24px rgba(0,0,0,0.35)"
			},
			borderRadius: {
				card: "12px",
				chip: "8px"
			},
			fontFamily: {
				head: ["Poppins", "ui-sans-serif", "system-ui"],
				body: ["Inter", "ui-sans-serif", "system-ui"]
			}
		}
	}
};

