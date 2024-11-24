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
        },
      },
    },
  },
  plugins: [],
};
