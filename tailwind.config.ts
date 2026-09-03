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
        /* Accent — "ivy": the single brand colour, tuned to read on both the
           light stone/white grounds and the near-black sections. The class name
           `gold` is kept from the previous palette so the re-skin needs no
           repo-wide rename; `ivy` is the alias new code should use. */
        gold: {
          DEFAULT: '#4E8862',
          light: '#6FA682',
          dark: '#2F5540',
        },
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
           it now resolves to the Libre Franklin sans display face. */
        serif: ['var(--font-display)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
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
