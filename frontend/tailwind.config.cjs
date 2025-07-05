/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { 'red-start': '#985D61', 'red-end': '#B38379', line: '#414141' },
    },
  },
  plugins: [],
};
