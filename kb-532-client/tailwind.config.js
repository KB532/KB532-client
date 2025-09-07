/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', 'src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#282725',
      white: '#FEFEFE',
      gray: {
        100: '#F8F8F8',
        200: '#F4F4F4',
        600: '#8F8F8F',
      },
      red: {
        100: '#FFE6E6',
        200: '#FF4242',
      },
      green: {
        100: '#E6F7DB',
        200: '#35B100',
      },
      blue: {
        100: '#E7EFFF',
        200: '#1E61F3',
      },
      kb: {
        yellow: {
          positive: '#FFBC00',
          negative: '#FFCC00',
          light: '#FEE7A5',
        },
        gray: {
          DEFAULT: '#60584C',
          dark: '#54504C',
        },
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Spoqa Han Sans Neo"', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.6875rem', // 11pt
        xs: '0.75rem', // 12pt
        sm: '0.875rem', // 14pt
        md: '1rem', // 16pt
        lg: '1.125rem', // 18pt
        xl: '1.25rem', // 20pt
        xxl: '1.5rem', // 24pt
      },
      boxShadow: {
        'bottom-navbar-shadow': '0 -2px 4px rgba(0,0,0,0.06)',
        'drop-shadow': '0 4px 6px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
