/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding custom colors to match your AgriIntel sidebar
        brand: {
          dark: '#0a101f',
          accent: '#3b82f6',
        }
      }
    },
  },
  plugins: [],
}