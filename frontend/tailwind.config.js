/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-in': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease',
        'slide-in': 'slide-in 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spin-fast': 'spin 0.7s linear infinite',
      },
      // The site palette. Use as classes (`bg-primary`, `text-ink-muted`) in templates and as
      // `theme('colors.primary')` / `theme('colors.primary / 10%')` in SCSS.
      // Flat names (not nested objects) so theme() works without `.DEFAULT`.
      // Tailwind's default colors (white, black, transparent, ...) stay available too.
      colors: {
        primary: '#da291c',
        'primary-light': '#e8493d',
        'primary-lighter': '#ff6b5e',
        'primary-dark': '#9e1d13',
        'primary-darkest': '#2a1311',

        // Text colors.
        ink: '#1a1a1a',
        'ink-muted': '#5f5f5f',
        'ink-subtle': '#9a9a9a',

        // Dark backgrounds: footer, mobile menu, image placeholders.
        dark: '#141414',
        'dark-slate': '#1a2a33',

        border: '#e2e2e2',
        surface: '#ffffff',
        background: '#f7f7f8',
        danger: '#b3261e',
        success: '#1e7d32',

        // Official colors of the social / messaging buttons.
        'brand-whatsapp': '#25d366',
        'brand-facebook': '#1877f2',
        'brand-instagram': '#e1306c',
      },
    },
  },
  plugins: [],
};
