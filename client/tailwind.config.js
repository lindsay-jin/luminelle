/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        '5/6': [5, 6],
      },
      margin: {
        40: '40px',
        120: '120px',
      },
    },
  },
  plugins: [],
};
