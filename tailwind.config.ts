import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
export default withUt({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        "100": "100",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        marquee: {
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        flashing: {
          "0%, 100%": { opacity: "0.2" },
          "20%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration) linear infinite",
        "fade-in": "fade-in 0.5s linear forwards",
        flashing: "flashing 1.4s infinite linear",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        opensans: ["var(--font-opensans)"],
        recursive: ["var(--font-recursive)"],
      },
      screens: {
        "2xl": { min: "1536px" },
        // => @media (max-width: 1535px) { ... }
        xl: { min: "1280px" },
        // => @media (max-width: 1279px) { ... }
        lg: { min: "1024px" },
        // => @media (max-width: 1023px) { ... }
        md: { min: "768px" },
        // => @media (max-width: 767px) { ... }
        sm: { min: "600px" },
        // => @media (max-width: 639px) { ... }
        xsm: { min: "480px" },
        xlmx: { max: "1280px" },
        // => @media (max-width: 1279px) { ... }
        lgmx: { max: "1024px" },
        // => @media (max-width: 1023px) { ... }
        mdmx: { max: "768px" },
        // => @media (max-width: 767px) { ... }
        smmx: { max: "600px" },
        // => @media (max-width: 639px) { ... }
        xsmmx: { max: "480px" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config);
