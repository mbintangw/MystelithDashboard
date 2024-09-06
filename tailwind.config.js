/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'Background' : '#fffffe',
        'Headline' : '#094067',
        'Paragraph' : '#5f6c7b',
        'Button' : '#3da9fc',
        'ButtonText' : '#fffffe',
        'Stroke' : '#094067',
        'Main' : '#fffffe',
        'Highlight' : '#3da9fc',
        'Secondary' : '#90b4ce',
        'Tertiary' : '#ef4565',
      },

    },
  },
  plugins: [],
}