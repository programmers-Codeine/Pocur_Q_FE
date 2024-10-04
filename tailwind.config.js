/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        em: '1em',
      },
      colors: {
        b50: '#e6f0ff',
        b75: '#96c0ff',
        b100: '#6ba6ff',
        b200: '#2b7fff',
        b300: '#0065ff',
        b400: '#0047b3',
        b500: '#003E9C',

        d10: '#fafbfb',
        d30: '#ebedf0',
        d50: '#c2c7d0',
        d80: '#98a1b0',
        d200: '#6b788e',
        d400: '#505f79',
        d700: '#243757',
        d900: '#091e42',

        highlightRed: '#dc2626',
        highlightYellow: '#ffd446',
        menuHover: '#cfd8e6',
      },
    },
    backgroundImage: {
      deviceFrame: "url('/src/assets/images/device_frame.png')",
    },
  },
  plugins: [],
};
