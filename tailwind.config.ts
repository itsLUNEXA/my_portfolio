import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme: Warm Editorial + Playful Luxury
        // Warm Cream: #FDF1EA (Dominant background)
        // Deep Teal: #03393F (Headings, typography, icons, primary buttons)
        // Soft Peach: #F2BB8E (Secondary buttons, interactive highlights)
        // Golden Yellow: #FDD9A5 (Featured highlights, decorative accents)
        // Muted Sage Teal: #5D867F (Subtle borders, secondary elements)
        // Pale Peach: #FAE6D9 (Cards and secondary surfaces)

        warm: {
          cream: "#FDF1EA",
          DEFAULT: "#FDF1EA",
        },
        peach: {
          DEFAULT: "#F2BB8E",
          soft: "#F2BB8E",
          pale: "#FAE6D9",
          hover: "#E8AE7E",
        },
        gold: {
          DEFAULT: "#FDD9A5",
          yellow: "#FDD9A5",
          light: "#FFEAD0",
        },
        sage: {
          DEFAULT: "#5D867F",
          muted: "#5D867F",
          border: "rgba(93, 134, 127, 0.25)",
        },
        teal: {
          DEFAULT: "#03393F",
          deep: "#03393F",
          pure: "#022428",
          dark: "#01191C",
          muted: "#21585F",
        },

        // Semantic Token Mappings:
        // graphite -> Warm Cream surfaces & Pale Peach cards
        graphite: {
          DEFAULT: "#FDF1EA",
          50: "#FFFFFF",
          100: "#FAE6D9", // Pale Peach for cards & secondary surfaces
          200: "#F2BB8E", // Soft Peach
          800: "#FDD9A5", // Golden Yellow
          900: "#FDF1EA", // Warm Cream
          950: "#FAE6D9", // Pale Peach
        },

        // cloud -> Deep Teal text, headings, borders, icons
        cloud: {
          DEFAULT: "#03393F",
          pure: "#022428",
          muted: "#21585F", // Readable body text
          subtle: "#5D867F", // Muted Sage Teal
          border: "rgba(93, 134, 127, 0.25)",
          surface: "#FAE6D9",
        },

        // sunshine -> Deep Teal primary buttons & active states with Soft Peach highlights
        sunshine: {
          DEFAULT: "#03393F", // Deep Teal primary buttons
          hover: "#022428",
          dark: "#01191C",
          light: "#F2BB8E", // Soft Peach
          accent: "#FDD9A5", // Golden Yellow
          glow: "rgba(3, 57, 63, 0.2)",
          border: "rgba(93, 134, 127, 0.35)",
        },

        // sky -> Soft Peach & Golden Yellow accents
        sky: {
          DEFAULT: "#F2BB8E",
          hover: "#E8AE7E",
          dark: "#5D867F",
          light: "#FDD9A5",
          subtle: "#FAE6D9",
          border: "rgba(93, 134, 127, 0.28)",
          glow: "rgba(242, 187, 142, 0.35)",
        },

        // navy -> Deep Teal
        navy: {
          DEFAULT: "#03393F",
          deep: "#022428",
          muted: "#21585F",
          subtle: "#5D867F",
          border: "rgba(93, 134, 127, 0.25)",
          surface: "#FAE6D9",
        },

        // ice -> Warm Cream & Pale Peach
        ice: {
          DEFAULT: "#FDF1EA",
          50: "#FFFFFF",
          100: "#FAE6D9",
          200: "#F2BB8E",
          300: "#FDD9A5",
          800: "#5D867F",
          900: "#03393F",
          950: "#FDF1EA",
        },

        // Standard shadcn / UI color tokens
        background: "#FDF1EA",
        foreground: "#03393F",
        card: {
          DEFAULT: "#FAE6D9",
          foreground: "#03393F",
        },
        muted: {
          DEFAULT: "#FAE6D9",
          foreground: "#5D867F",
        },
        border: "rgba(93, 134, 127, 0.25)",
        ring: "#03393F",
        chart: {
          1: "#03393F",
          2: "#F2BB8E",
          3: "#FDD9A5",
          4: "#5D867F",
          5: "#21585F",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        "golden-spotlight": "radial-gradient(circle at 50% 45%, rgba(253, 217, 165, 0.5) 0%, rgba(253, 241, 234, 0) 70%)",
        "golden-spotlight-intense": "radial-gradient(circle at 50% 40%, rgba(242, 187, 142, 0.6) 0%, rgba(253, 241, 234, 0) 72%)",
        "subtle-glow": "radial-gradient(circle at 50% 0%, rgba(253, 217, 165, 0.4) 0%, transparent 60%)",
      },
      boxShadow: {
        "gold-sm": "0 2px 14px -2px rgba(3, 57, 63, 0.12)",
        "gold-md": "0 4px 22px -3px rgba(3, 57, 63, 0.18)",
        "gold-lg": "0 8px 32px -4px rgba(3, 57, 63, 0.25)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
  ],
};
export default config;
