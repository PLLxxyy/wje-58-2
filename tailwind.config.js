/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        paper: "#f5f0e1",
        ink: "#3d2b1f",
        "accent-red": "#8b2500",
        "accent-blue": "#1a365d",
        "accent-green": "#234e3a",
      },
      fontFamily: {
        "courier-prime": ["'Courier Prime'", "monospace"],
        "special-elite": ["'Special Elite'", "cursive"],
        "cutive-mono": ["'Cutive Mono'", "monospace"],
        "vt323": ["'VT323'", "monospace"],
        "share-tech-mono": ["'Share Tech Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
