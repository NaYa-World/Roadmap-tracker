/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          purple: '#7864ff',
          green:  '#00d9a0',
          blue:   '#4fa8ff',
          gold:   '#ffc850',
          pink:   '#ff7eb3',
          orange: '#ff8c42',
          violet: '#b98aff',
          red:    '#ff6b6b',
        },
      },
    },
  },
  plugins: [],
}
