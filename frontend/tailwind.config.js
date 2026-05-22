/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#050608',
          card: '#0f1118',
          border: '#1f293d',
          primary: '#ef4444',     // Crimson Esports Red
          secondary: '#3b82f6',   // Neon blue / cyan
          accent: '#10b981',      // Success / Green
          gold: '#eab308',        // Golden accents
          muted: '#8e9aa8',       // Muted gray
          glass: 'rgba(15, 17, 24, 0.7)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.45)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.45)',
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.45)',
        'glow-gold': '0 0 15px rgba(234, 179, 8, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
