import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
