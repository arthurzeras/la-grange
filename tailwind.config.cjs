/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Mulish', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      mono: [
        'Noto Sans Mono',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
  },
};
