module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              'h1, h2, h3, h4, h5, h6': {
                'scroll-margin-top': `${64 / 16}rem`,
              },
              '.anchor-tag': {
                color: theme('colors.gray.900'),
                textDecoration: 'none',
              },
              '.anchorjs-link': {
                color: theme('colors.gray.400'),
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'all 200ms linear',
              },
            },
          },
          dark: {
            css: {
              color: theme('colors.gray.300'),
              '[class~="lead"]': { color: theme('colors.gray.400') },
              a: { color: theme('colors.gray.50') },
              strong: { color: theme('colors.gray.50') },
              'ul > li::before': { backgroundColor: theme('colors.gray.700') },
              hr: { borderColor: theme('colors.gray.800') },
              blockquote: {
                color: theme('colors.gray.50'),
                borderLeftColor: theme('colors.gray.800'),
              },
              h1: { color: theme('colors.gray.50') },
              h2: { color: theme('colors.gray.50') },
              h3: { color: theme('colors.gray.50') },
              h4: { color: theme('colors.gray.50') },
              code: { color: theme('colors.gray.50') },
              'a code': { color: theme('colors.gray.50') },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.gray.50'),
                borderBottomColor: theme('colors.gray.700'),
              },
              'tbody tr': { borderBottomColor: theme('colors.gray.800') },
              '.anchorjs-link': {
                color: theme('colors.gray.50'),
              },
            },
          },
        };
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'markdown',
    }),
  ],
};
