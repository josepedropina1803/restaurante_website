/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      },
      colors: {
        'gold': '#D4AF37',
        'dark-brown': '#2C1810',
        'cream': '#F5F5DC',
      }
    },
  },
  plugins: [],
}
