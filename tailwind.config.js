const nativewind = require("nativewind/preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [nativewind],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FAF5EF",
          100: "#F3E5D8",
          200: "#EADBCE",
        },
        terracotta: {
          300: "#E3B89B",
          500: "#C46851",
          700: "#A3483E",
        },
        earth: {
          muted: "#9B8A85",
          body: "#5C3636",
          heading: "#2C1E1B",
        },
      },
    },
  },
  plugins: [],
};