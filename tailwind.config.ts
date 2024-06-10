import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1200px',
      xl: '1280px',
      '1xl': '1366px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '1750px',
    },
    colors: {
      'light-gray': '#F4F7F9',
      white: '#FFFFFF',
      blue: '#4690E2',
    },
  },
  plugins: [],
}
export default config
