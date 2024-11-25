/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: "#6A5ACD",
          400: "#836FFF",
        },
        yellow: {
          400: "#FFD700",
          500: "#B8860B"
        },
        borgona: {
          400: "#800020",
        },
        marineBlue: {
          400: "#003366",
        },
        beige: {
          100: "#FAF3E0",
        },
        pureWhite: {
          100: "#FFFFFF",
        },
        grafiteGray: {
          400: "#2E3B4E",
        },
        steelBlue: {
          400: "#4A90E2",
        },
        green: {
          100: "#B8E986",
          400: "#00FF00",
        },
      },
    },
  },
  plugins: [],
};
