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
              code: { color: theme('colors.pink.500') },
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
              code: { color: theme('colors.blue.400') },
              blockquote: {
                borderLeftColor: theme('colors.gray.700'),
                color: theme('colors.gray.50'),
              },
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
    require('@tailwindcss/aspect-ratio'),
  ],
};
