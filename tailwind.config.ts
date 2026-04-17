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
        background: "#0d0a07",
        foreground: "#e8dcc8",
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e8c96a",
          dark: "#8a6f2e",
        },
        cream: "#f5ede0",
        charcoal: "#1a1410",
        obsidian: "#0d0a07",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Georgia", "serif"],
        serif: ["Georgia", "Palatino", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        luxury: "0.15em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        shimmer: "shimmer 4s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
