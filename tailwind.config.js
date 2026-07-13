/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00E3B6",
        secondary: "#86db5a",
        tertiary: "#b7c8e1",
        background: "#0e1513",
        "background-deep": "#020b14",
        surface: "#0e1513",
        "surface-container": "#1a211f",
        "surface-container-high": "#252b2a",
        "surface-container-highest": "#2f3634",
        "surface-container-low": "#161d1b",
        "surface-bright": "#343b39",
        "on-surface": "#dde4e1",
        "on-surface-variant": "#bbcac6",
        "on-primary": "#003731",
        "on-secondary": "#003915",
        "on-tertiary": "#213146",
        "primary-container": "#14b8a6",
        "secondary-container": "#00b954",
        "outline": "#859490",
        "outline-variant": "#3c4947",
        "text-muted": "#94a3b8",
        "border-subtle": "rgba(255,255,255,0.1)",
        "surface-glass": "rgba(255,255,255,0.03)",
        "glow-teal": "rgba(20,184,166,0.4)",
        error: "#ffb4ab",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        pulse: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.5 } },
        "loader-bar": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "loader-bar": "loader-bar 2.4s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
