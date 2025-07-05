/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'red-start': '#985D61',
        'red-end': '#B38379',
        bedge: '#F5EEC2',
        line: '#414141',
      },
    },
  },
  plugins: [],
};
