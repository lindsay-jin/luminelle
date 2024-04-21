/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        '5/6': [5, 6],
      },
    },
  },
  plugins: [],
};
