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
        /* Brand gold — from the Ivy Group logo mark. The primary accent:
           eyebrows, rules, small marks, and gold-on-dark moments. Use
           `gold-dark` for links and text on light grounds (better contrast). */
        gold: {
          DEFAULT: '#C9A84C',
          light: '#DEC584',
          dark: '#A8872A',
        },
        /* Ivy green — a supporting tint (courtyards, planting, quiet accents). */
        ivy: {
          DEFAULT: '#4E8862',
          light: '#6FA682',
          dark: '#2F5540',
        },
        dark: '#17191B',
        ink: '#17191B',
        cream: '#F1F2ED',
        stone: '#F1F2ED',
      },
      fontFamily: {
        /* `serif` is kept as the display key (previous markup uses `font-serif`);
           it now resolves to Jost, a geometric sans display face. */
        serif: ['var(--font-display)', 'Futura', 'Trebuchet MS', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Futura', 'Trebuchet MS', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

export default config
