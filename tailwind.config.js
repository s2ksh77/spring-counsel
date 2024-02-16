/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: { min: '200px', max: '599px' }, // 모바일
      md: { min: '600px', max: '1033px' }, // 태블릿 세로
      lg: { min: '1034px', max: '1600px' }, // 태블릿 가로
      xl: { min: '1600px', max: '1800px' }, // pc
    },
  },
  darkMode: 'media', // media:브라우저 설정 class:우리가 state로 설정 부모 하위에 요소 위치로
  plugins: [require('@tailwindcss/forms')],
};
