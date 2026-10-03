import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0d2b52",
        cobalt: "#1565c0",
        sky: "#90caf9",
        forest: "#1b5e20",
        emerald: "#2e7d32",
        mint: "#a5d6a7",
        surface: "#f8fafc",
        muted: "#546e7a",
        purple: "#6a1b9a",
        orange: "#e65100",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        plex: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "universe-burst": {
          "0%": { transform: "scale(0.2)", opacity: "0" },
          "60%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "universe-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-3px)" },
          "75%": { transform: "translateX(3px)" },
        },
        "universe-streak": {
          "0%": { transform: "translateX(-20%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(120%)", opacity: "0" },
        },
        "universe-walk": {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(10%)" },
        },
        "universe-flicker": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
        "universe-sway": {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        "universe-rise": {
          "0%": { transform: "translateY(12%)", opacity: "0.4" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "universe-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "universe-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "universe-shrink": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.6)" },
        },
      },
      animation: {
        "universe-burst": "universe-burst 1.2s ease-out forwards",
        "universe-shake": "universe-shake 0.5s ease-in-out 2",
        "universe-streak": "universe-streak 2.5s ease-in-out forwards",
        "universe-walk": "universe-walk 6s ease-in-out infinite alternate",
        "universe-flicker": "universe-flicker 1.6s ease-in-out infinite",
        "universe-sway": "universe-sway 3s ease-in-out infinite",
        "universe-rise": "universe-rise 1.4s ease-out forwards",
        "universe-float": "universe-float 3s ease-in-out infinite",
        "universe-fade": "universe-fade 1s ease-out forwards",
        "universe-shrink": "universe-shrink 1.8s ease-out forwards",
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "var(--font-ibm-plex-sans)",
            h1: { fontFamily: "var(--font-playfair)" },
            h2: { fontFamily: "var(--font-playfair)" },
            h3: { fontFamily: "var(--font-playfair)" },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
