import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          DEFAULT: "#1C1D20",
          50: "#2A2C31",
          100: "#24262A",
          200: "#1E2024",
          800: "#17181A",
          900: "#121315",
          950: "#0D0E0F",
        },
        cloud: {
          DEFAULT: "#F2F4F1",
          pure: "#FFFFFF",
          muted: "#B8BCB6",
          subtle: "#7E847C",
          border: "rgba(242, 244, 241, 0.12)",
          surface: "rgba(242, 244, 241, 0.04)",
        },
        sunshine: {
          DEFAULT: "#FFC928",
          hover: "#F5BE1B",
          dark: "#D4A113",
          light: "#FFD966",
          glow: "rgba(255, 201, 40, 0.22)",
          border: "rgba(255, 201, 40, 0.4)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        "golden-spotlight": "radial-gradient(circle at 50% 45%, rgba(255, 201, 40, 0.18) 0%, rgba(28, 29, 32, 0) 70%)",
        "golden-spotlight-intense": "radial-gradient(circle at 50% 40%, rgba(255, 201, 40, 0.28) 0%, rgba(28, 29, 32, 0) 72%)",
        "subtle-glow": "radial-gradient(circle at 50% 0%, rgba(255, 201, 40, 0.08) 0%, transparent 60%)",
      },
      boxShadow: {
        "gold-sm": "0 0 15px -3px rgba(255, 201, 40, 0.25)",
        "gold-md": "0 0 25px -4px rgba(255, 201, 40, 0.35)",
        "gold-lg": "0 0 45px -5px rgba(255, 201, 40, 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
