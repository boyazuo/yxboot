import tailwindConfig from '@yxboot/tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  ...tailwindConfig,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
