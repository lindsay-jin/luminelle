/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      margin: {
        40: '40px',
        120: '120px',
      },
      height: {
        74: '74px',
      },
      colors: {
        grey: '#9ca3af',
        natural: '#fff7ed',
        yellow: '#fde047',
        red: '#be123c',
        pink: '#f9a8d4',
        green: '#16a34a',
        blue: '#0ea5e9',
      },
    },
  },
  plugins: [],
};
