/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			spacing: {
				1: "0.25em",
				2: "0.5em",
				3: "0.75em",
				4: "1em",
				5: "1.25em",
				6: "1.5em",
				7: "1.75em",
				8: "2em",
				9: "2.25em",
				10: "2.5em",
				11: "2.75em",
				12: "3em",
			},
			fontSize: {
				xs: "0.75em",
				sm: "0.875em",
				base: "1em",
				lg: "1.125em",
				xl: "1.25em",
				"3xl": "1.5em",
				"4xl": "1.75em",
				"5xl": "2em",
				"6xl": "3em",
			},
		},
	},
	plugins: [],
};
