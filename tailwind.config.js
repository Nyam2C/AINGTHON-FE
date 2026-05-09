/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceDot: {
          '0%, 80%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '40%': { transform: 'translateY(-6px)', opacity: '1' },
        },
        fadeInUpCenter: {
          '0%': { opacity: '0', transform: 'translate(-50%, 16px)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 600ms ease-out both',
        'fade-in-delayed': 'fadeIn 400ms ease-out 600ms both',
        'fade-in-up-text-1': 'fadeInUp 400ms ease-out both',
        'fade-in-up-text-2': 'fadeInUp 400ms ease-out 200ms both',
        'fade-in-up-center-2': 'fadeInUpCenter 400ms ease-out 200ms both',
        'fade-in': 'fadeIn 300ms ease-out both',
        'pulse-soft': 'pulseSoft 1500ms ease-in-out infinite',
        'bounce-dot-0': 'bounceDot 1200ms ease-in-out infinite',
        'bounce-dot-1': 'bounceDot 1200ms ease-in-out 150ms infinite',
        'bounce-dot-2': 'bounceDot 1200ms ease-in-out 300ms infinite',
      },
    },
  },
  plugins: [],
};
