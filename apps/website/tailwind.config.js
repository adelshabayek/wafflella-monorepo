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
          primary: "#D81B60",
          secondary: "#F48FB1",
          accent: "#4E342E",
          background: "#FFFDFB",
          text: "#3E2723",
          muted: "#8D6E63",
          border: "#F5E6E8",
          card: "#FFFFFF",
          "primary-hover": "#AD1457",
          "primary-light": "#FCE4EC",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(216, 27, 96, 0.08)",
        card: "0 4px 24px rgba(62, 39, 35, 0.04)",
        "card-hover": "0 12px 48px rgba(216, 27, 96, 0.12)",
        float: "0 8px 30px rgba(62, 39, 35, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #D81B60 0%, #F06292 50%, #F48FB1 100%)",
        "gradient-warm":
          "linear-gradient(180deg, #FFFDFB 0%, #FFF0F5 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #FFFDFB 0%, #FFF0F5 40%, #FCE4EC 100%)",
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
