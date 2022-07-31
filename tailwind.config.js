/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        waterSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        shake: {
          "50%, 100%": { transform: "rotate(0deg)" },
          "62.5%, 77.5%": { transform: "rotate(2deg)" },
          "70%": { transform: "rotate(-2deg)" },
        },
      },
      animation: {
        waterSpin: "waterSpin 8s ease-in-out infinite",
        blink: "blink 3s linear infinite",
        shake: "shake 2s linear infinite",
      },
    },
  },
  plugins: [],
};
