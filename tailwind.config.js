/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ========================================
      // COLORS - Using CSS Variables
      // ========================================
      colors: {
        // Primary Brand Colors
        gold: {
          DEFAULT: 'var(--color-gold)',
          light: 'var(--color-gold-light)',
          dark: 'var(--color-gold-dark)',
          accent: 'var(--color-gold-accent)',
          muted: 'var(--color-gold-muted)',
          hover: 'var(--color-gold-hover)',
          soft: 'var(--color-gold-soft)',
          pale: 'var(--color-gold-pale)',
        },

        // Secondary Brand Colors
        green: {
          primary: 'var(--color-green-primary)',
          dark: 'var(--color-green-dark)',
          medium: 'var(--color-green-medium)',
          accent: 'var(--color-green-accent)',
          hover: 'var(--color-green-hover)',
          light: 'var(--color-green-light)',
        },

        // Accent Colors
        blue: 'var(--color-blue)',
        navy: 'var(--color-navy)',

        // Neutral Colors
        cream: {
          DEFAULT: 'var(--color-cream)',
          light: 'var(--color-cream-light)',
        },
        ivory: 'var(--color-ivory)',
        beige: {
          DEFAULT: 'var(--color-beige)',
          dark: 'var(--color-beige-dark)',
        },
        sage: 'var(--color-sage)',
        tan: 'var(--color-tan)',
        'warm-white': 'var(--color-warm-white)',
        'warm-gray': 'var(--color-warm-gray)',
        'light-gray': 'var(--color-light-gray)',

        // Text Colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',

        // Background Colors
        'bg-light': 'var(--color-bg-light)',
        'bg-dark': 'var(--color-bg-dark)',
        'bg-footer': 'var(--color-bg-footer)',
      },

      // ========================================
      // SPACING - Using CSS Variables
      // ========================================
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
      },

      // ========================================
      // BORDER RADIUS - Using CSS Variables
      // ========================================
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        'full': 'var(--radius-full)',
      },

      // ========================================
      // TYPOGRAPHY - Using CSS Variables
      // ========================================
      fontFamily: {
        primary: 'var(--font-primary)',
        serif: 'var(--font-serif)',
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },

      fontWeight: {
        thin: 'var(--font-weight-thin)',
        normal: 'var(--font-weight-normal)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },

      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
        '7xl': 'var(--font-size-7xl)',
      },

      lineHeight: {
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
      },

      letterSpacing: {
        tight: 'var(--letter-spacing-tight)',
        normal: 'var(--letter-spacing-normal)',
        wide: 'var(--letter-spacing-wide)',
        wider: 'var(--letter-spacing-wider)',
      },

      // ========================================
      // SHADOWS - Using CSS Variables
      // ========================================
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'gold': 'var(--shadow-gold)',
        'gold-hover': 'var(--shadow-gold-hover)',
      },

      textShadow: {
        'sm': 'var(--text-shadow-sm)',
        'md': 'var(--text-shadow-md)',
        'lg': 'var(--text-shadow-lg)',
      },

      // ========================================
      // TRANSITIONS - Using CSS Variables
      // ========================================
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'base': 'var(--transition-base)',
        'medium': 'var(--transition-medium)',
        'slow': 'var(--transition-slow)',
        'slower': 'var(--transition-slower)',
      },

      transitionTimingFunction: {
        'in-out': 'var(--ease-in-out)',
        'out': 'var(--ease-out)',
        'in': 'var(--ease-in)',
      },

      // ========================================
      // Z-INDEX - Using CSS Variables
      // ========================================
      zIndex: {
        'base': 'var(--z-base)',
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'fixed': 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        'modal': 'var(--z-modal)',
        'popover': 'var(--z-popover)',
        'tooltip': 'var(--z-tooltip)',
      },

      // ========================================
      // OPACITY - Using CSS Variables
      // ========================================
      opacity: {
        'disabled': 'var(--opacity-disabled)',
        'hover': 'var(--opacity-hover)',
        'muted': 'var(--opacity-muted)',
        'overlay': 'var(--opacity-overlay)',
      },

      // ========================================
      // BACKGROUND IMAGES (Gradients)
      // ========================================
      backgroundImage: {
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-gold-alt': 'var(--gradient-gold-alt)',
        'gradient-gold-button': 'var(--gradient-gold-button)',
        'gradient-green': 'var(--gradient-green)',
        'gradient-sage': 'var(--gradient-sage)',
        'gradient-cream': 'var(--gradient-cream)',
      },

      // ========================================
      // MAX WIDTH (Containers)
      // ========================================
      maxWidth: {
        'container-sm': 'var(--container-sm)',
        'container-md': 'var(--container-md)',
        'container-lg': 'var(--container-lg)',
        'container-xl': 'var(--container-xl)',
        'container-2xl': 'var(--container-2xl)',
        'content': 'var(--container-content)',
        'wide': 'var(--container-wide)',
      },

      // ========================================
      // CUSTOM UTILITIES
      // ========================================
      height: {
        'navbar': 'var(--navbar-height)',
        'map': 'var(--map-height)',
        'map-mobile': 'var(--map-height-mobile)',
      },

      minWidth: {
        'button': 'var(--button-min-width)',
        'button-lg': 'var(--button-min-width-lg)',
      },
    },
  },
  plugins: [
    // Custom plugin for text-shadow utility
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
};
