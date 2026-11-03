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
          navy: "#07162C",
          "navy-dark": "#040D1A",
          "navy-card": "#0B1E3B",
          "navy-border": "#1E3557",
          blue: "#0052CC",
          "blue-hover": "#0040A8",
          cyan: "#00C2FF",
          surface: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};
