/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        main: '1200px'
      },
      backgroundColor: {
        main: '#0045A8',
        'overlay-10': 'rgba(0,0,0,0.1)',
        'overlay-20': 'rgba(0,0,0,0.2)',
      },
      colors: {
        main: '#0045A8',
      }
    },
    keyframes: {
      'scale-up-center': {
        '0%': {
          '-webkit-transform': 'scale(0.2);',
          transform: 'scale(0.2);'
        },
        '100%': {
          '-webkit-transform': 'scale(1);',
          transform: 'scale(1);'
        }
      }
    },
    animation: {
      'scale-up-center': 'scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;',
    }
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
}