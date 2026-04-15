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
        midnight: "#0a0a0a",
        charcoal: "#1a1a1a",
        espresso: "#2c1810",
        ivory: "#f5f0e8",
        sand: "#c4b5a0",
        brass: "#b8972f",
        "brass-light": "#d4b44a",
        pearl: "#e8e0d4",
        "pearl-highlight": "#f0ebe3",
        "warm-gray": "#a89f94",
        "deep-brown": "#3d2b1f",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading": ["clamp(1.75rem, 3vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "subheading": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.2" }],
      },
      spacing: {
        "section": "clamp(6rem, 14vw, 12rem)",
      },
      transitionDuration: {
        "700": "700ms",
        "900": "900ms",
        "1200": "1200ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "reveal-left": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        "slide-up": "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 3s ease-in-out infinite",
        "reveal-left": "reveal-left 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-grow": "line-grow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
