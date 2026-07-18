/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#E91E63",
          secondary: "#FFB6C1",
          accent: "#8B4513",
          background: "#FFF8F5",
          text: "#2D2D2D",
          muted: "#6B6B6B",
          border: "#F0E0DA",
          "primary-hover": "#C2185B",
          "primary-light": "#FCE4EC",
        },
        dash: {
          bg: "#F8F9FA",
          sidebar: "#1A1A2E",
          "sidebar-hover": "#16213E",
          card: "#FFFFFF",
          border: "#E9ECEF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 20px rgba(0,0,0,0.10)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
