/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vercel: {
          canvas: '#0a1406',
          'canvas-soft': '#0e1a0b',
          'canvas-soft-2': '#12210b',
          ink: '#f7fee7',
          body: '#d9f99d',
          mute: '#a3e635',
          hairline: 'rgba(163, 230, 53, 0.2)',
          'hairline-strong': 'rgba(163, 230, 53, 0.4)',
          link: '#a3e635',
          'link-deep': '#84cc16',
          violet: '#84cc16',
          cyan: '#a3e635',
          pink: '#facc15',
          amber: '#f5a623',
        },
        natural: {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#1e3314',
          950: '#0a1406',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'monospace'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'pill-sm': '64px',
        'pill': '100px',
      },
      backgroundImage: {
        'natural-mesh': 'radial-gradient(ellipse at 50% -20%, rgba(163, 230, 53, 0.25), rgba(250, 204, 21, 0.1), rgba(0, 0, 0, 0))',
        'gradient-develop': 'linear-gradient(90deg, #a3e635 0%, #facc15 50%, #4ade80 100%)',
        'gradient-preview': 'linear-gradient(90deg, #facc15 0%, #fb923c 100%)',
        'gradient-ship': 'linear-gradient(90deg, #4ade80 0%, #a3e635 100%)',
      },
      boxShadow: {
        'natural-glow': '0 0 40px -10px rgba(163, 230, 53, 0.35)',
        'vercel-card': '0 0 0 1px rgba(163, 230, 53, 0.18), 0 8px 32px 0 rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
