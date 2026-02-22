import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f1115",
        panel: "#171a1f",
        line: "#262b33",
        ink: "#eef2f7",
        muted: "#9aa7b8",
        accent: "#2aa88f",
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "ui-monospace", "monospace"],
      },
      maxWidth: {
        reading: "820px",
      },
      keyframes: {
        pulsebar: {
          "0%, 100%": { opacity: "0.35", transform: "scaleY(0.65)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
      animation: {
        pulsebar: "pulsebar 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
