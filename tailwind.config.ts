import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        navy: '#0f172a',
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#38bdf8',
              '&:hover': { color: '#7dd3fc' },
            },
            'h2, h3, h4': {
              scrollMarginTop: '80px',
            },
            // Dark mode overrides for prose
            color: '#d4d4d8', 
            h1: { color: '#f4f4f5' },
            h2: { color: '#f4f4f5' },
            h3: { color: '#f4f4f5' },
            h4: { color: '#f4f4f5' },
            strong: { color: '#f4f4f5' },
            code: { color: '#f4f4f5', backgroundColor: '#27272a', padding: '0.2em 0.4em', borderRadius: '0.25rem' },
            blockquote: { color: '#a1a1aa', borderLeftColor: '#3f3f46' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
