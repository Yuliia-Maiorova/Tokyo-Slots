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
        'slot-green': '#c4d94e',
        'slot-orange': '#ff6b35',
        'slot-red': '#e63946',
        'slot-blue': '#4ecdc4',
        'slot-yellow': '#ffe66d',
        'slot-gold': '#ffd700',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'spin-slot': 'spin-slot 0.1s linear infinite',
        'bounce-win': 'bounce 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};