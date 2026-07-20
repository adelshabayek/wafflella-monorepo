/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#BA7571",
          secondary: "#EDA7B1",
          accent: "#5C3123",
          background: "#FFF9F9",
          text: "#4A2E2B",
          muted: "#9E7A76",
          border: "#F7E1E3",
          card: "#FFFFFF",
          "primary-hover": "#9F5B57",
          "primary-light": "#FBE4E7",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(186, 117, 113, 0.08)",
        card: "0 4px 24px rgba(74, 46, 43, 0.04)",
        "card-hover": "0 12px 48px rgba(186, 117, 113, 0.15)",
        float: "0 8px 30px rgba(74, 46, 43, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #BA7571 0%, #D48C88 50%, #EDA7B1 100%)",
        "gradient-warm":
          "linear-gradient(180deg, #FFF9F9 0%, #FBE4E7 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #FFF9F9 0%, #FCF0F1 40%, #FBE4E7 100%)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
