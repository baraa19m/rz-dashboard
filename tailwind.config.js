/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF3FB', 100: '#DCE6F7', 200: '#B7CBEE', 400: '#5B84CC',
          500: '#2A5BB5', 600: '#1B418F', 700: '#12337A', 800: '#0D2762', 900: '#0A1F4F',
        },
        rz: { red: '#D72328', redDark: '#B51A1F', redSoft: '#FDECEC' },
        surface: { DEFAULT: '#F5F7FB', border: '#E3E8F2' },
      },
      fontFamily: { sans: ['Outfit', 'Cairo', 'system-ui', 'sans-serif'] },
      boxShadow: { card: '0 1px 2px rgba(10,31,79,.05), 0 6px 20px rgba(10,31,79,.06)' },
    },
  },
  plugins: [],
}
