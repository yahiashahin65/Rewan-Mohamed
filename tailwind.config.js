/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Tajawal', 'Arial', 'sans-serif'],
        english: ['DM Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
