/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: { min: '200px', max: '599px' },
      md: { min: '768px', max: '899px' },
      lg: { min: '992px', max: '1199px' },
      xl: { min: '1200px', max: '1799px' },
    },
  },
  darkMode: 'media', // media:브라우저 설정 class:우리가 state로 설정 부모 하위에 요소 위치로
  plugins: [require('@tailwindcss/forms')],
};
