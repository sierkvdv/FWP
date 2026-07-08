/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // Editorial rhythm — one calm, deliberate system.
    extend: {
      colors: {
        bg: '#0a0a0c',       // dominante donker
        surface: '#101014',  // kaarten, subtiel opgetild
        line: '#1c1c22',     // randen, vaag zichtbaar
        ink: '#f4f4f6',      // tekst primair
        muted: '#7a7a86',    // tekst tweede
        accent: '#00e5c7',   // cyaan — SPAARZAAM
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1360px',
        prose: '640px',
      },
      letterSpacing: {
        tightest: '-0.03em',
        display: '-0.02em',
        label: '0.12em',
      },
      lineHeight: {
        display: '1.05',
        snug: '1.15',
        relaxed: '1.65',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
