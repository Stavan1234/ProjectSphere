/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust paths to include all relevant files
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can extend the default theme here
      colors: {
        // Custom colors can be added here
        primary: '#73D8E3',
        secondary: '#DEFAFF',
      },
    },
  },
  plugins: [],
}