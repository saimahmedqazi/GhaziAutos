// tailwind.config.js

module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#DC2626', // Your main red color
            light: '#FEE2E2',   // Light red for backgrounds
          },
          secondary: '#1F2937', // For text and accents
        },
        fontFamily: {
          sans: ['var(--font-inter)', 'sans-serif'],
        },
        backdropBlur: {
          xs: '2px',
          sm: '4px',
          DEFAULT: '8px',
        },
      },
    },
    plugins: [
      require('tailwindcss-animate'),
      require('@tailwindcss/typography'),
    ],
  }