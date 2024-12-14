import { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    /*
      Great example of web developers who don't understand the basics of CSS.
      https://github.com/tailwindlabs/tailwindcss/discussions/1739
    */
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      // 'default-body': '#3b4f52',
      'primary': '#bef49a',
      // 'primary-contrast': '#1e3445',
      'primary-contrast': '#005b46',
      // 'text': '#8ca88e',
      'white': '#fff',
      'black': '#000',
      'marker': '#ff8080',
    },
  },
  plugins: [],
} satisfies Config