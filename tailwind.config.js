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
              'pre[class*="language-"], code[class*="language-"]': {
                color: theme('colors.trueGray.300'),
                fontSize: '13px',
                textShadow: 'none',
                fontFamily:
                  'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
                direction: 'ltr',
                textAlign: 'left',
                whiteSpace: 'pre',
                wordSpacing: 'normal',
                wordBreak: 'normal',
                lineHeight: 1.5,
                MozTabSize: '4',
                OTabSize: '4',
                tabSize: 4,
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                msHyphens: 'none',
                hyphens: 'none',
              },
              'pre[class*="language-"]::selection, code[class*="language-"]::selection, pre[class*="language-"] *::selection, code[class*="language-"] *::selection':
                {
                  textShadow: 'none',
                  background: '#75a7ca',
                },
              '@media print': {
                'pre[class*="language-"], code[class*="language-"]': {
                  textShadow: 'none',
                },
              },
              'pre[class*="language-"]': {
                padding: '1em',
                margin: '.5em 0',
                overflow: 'auto',
                background: '#1e1e1e',
              },
              ':not(pre) > code[class*="language-"]': {
                padding: '.1em .3em',
                borderRadius: '.3em',
                color: '#db4c69',
                background: '#f9f2f4',
              },
              '.namespace': { opacity: 0.7 },
              '.token.doctype .token.doctype-tag': { color: '#569CD6' },
              '.token.doctype .token.name': { color: '#9cdcfe' },
              '.token.comment, .token.prolog': { color: '#6a9955' },
              '.token.punctuation, .language-html .language-css .token.punctuation, .language-html .language-javascript .token.punctuation':
                {
                  color: theme('colors.trueGray.300'),
                },
              '.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.inserted, .token.unit':
                {
                  color: '#b5cea8',
                },
              '.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.deleted':
                {
                  color: '#ce9178',
                },
              '.language-css .token.string.url': {
                textDecoration: 'underline',
              },
              '.token.operator, .token.entity': {
                color: theme('colors.trueGray.300'),
              },
              '.token.operator.arrow': { color: '#569CD6' },
              '.token.atrule': { color: '#ce9178' },
              '.token.atrule .token.rule': { color: '#c586c0' },
              '.token.atrule .token.url': { color: '#9cdcfe' },
              '.token.atrule .token.url .token.function': { color: '#dcdcaa' },
              '.token.atrule .token.url .token.punctuation': {
                color: theme('colors.trueGray.300'),
              },
              '.token.keyword': { color: '#569CD6' },
              '.token.keyword.module, .token.keyword.control-flow': {
                color: '#c586c0',
              },
              '.token.function, .token.function .token.maybe-class-name': {
                color: '#dcdcaa',
              },
              '.token.regex': { color: '#d16969' },
              '.token.important': { color: '#569cd6' },
              '.token.italic': { fontStyle: 'italic' },
              '.token.constant': { color: '#9cdcfe' },
              '.token.class-name, .token.maybe-class-name': {
                color: '#4ec9b0',
              },
              '.token.console': { color: '#9cdcfe' },
              '.token.parameter': { color: '#9cdcfe' },
              '.token.interpolation': { color: '#9cdcfe' },
              '.token.punctuation.interpolation-punctuation': {
                color: '#569cd6',
              },
              '.token.boolean': { color: '#569cd6' },
              '.token.property, .token.variable, .token.imports .token.maybe-class-name, .token.exports .token.maybe-class-name':
                {
                  color: '#9cdcfe',
                },
              '.token.selector': { color: '#d7ba7d' },
              '.token.escape': { color: '#d7ba7d' },
              '.token.tag': { color: '#569cd6' },
              '.token.tag .token.punctuation': { color: '#808080' },
              '.token.cdata': { color: '#808080' },
              '.token.attr-name': { color: '#9cdcfe' },
              '.token.attr-value, .token.attr-value .token.punctuation': {
                color: '#ce9178',
              },
              '.token.attr-value .token.punctuation.attr-equals': {
                color: theme('colors.trueGray.300'),
              },
              '.token.entity': { color: '#569cd6' },
              '.token.namespace': { color: '#4ec9b0' },
              'pre[class*="language-javascript"], code[class*="language-javascript"], pre[class*="language-jsx"], code[class*="language-jsx"], pre[class*="language-typescript"], code[class*="language-typescript"], pre[class*="language-tsx"], code[class*="language-tsx"]':
                {
                  color: '#9cdcfe',
                },
              'pre[class*="language-css"], code[class*="language-css"]': {
                color: '#ce9178',
              },
              'pre[class*="language-html"], code[class*="language-html"]': {
                color: theme('colors.trueGray.300'),
              },
              '.language-regex .token.anchor': { color: '#dcdcaa' },
              '.language-html .token.punctuation': { color: '#808080' },
              'pre[data-line]': { position: 'relative' },
              'pre[class*="language-"] > code[class*="language-"]': {
                position: 'relative',
                zIndex: 1,
              },
              '.line-highlight': {
                position: 'absolute',
                left: '0',
                right: '0',
                padding: 'inherit 0',
                marginTop: '1em',
                background: '#f7ebc6',
                boxShadow: 'inset 5px 0 0 #f7d87c',
                zIndex: 0,
                pointerEvents: 'none',
                lineHeight: 'inherit',
                whiteSpace: 'pre',
              },
            },
          },
          dark: {
            css: {
              color: theme('colors.gray.300'),
              '[class~="lead"]': { color: theme('colors.gray.400') },
              a: { color: theme('colors.gray.100') },
              strong: { color: theme('colors.gray.100') },
              'ul > li::before': { backgroundColor: theme('colors.gray.700') },
              hr: { borderColor: theme('colors.gray.800') },
              blockquote: {
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.800'),
              },
              h1: { color: theme('colors.gray.100') },
              h2: { color: theme('colors.gray.100') },
              h3: { color: theme('colors.gray.100') },
              h4: { color: theme('colors.gray.100') },
              code: { color: theme('colors.gray.100') },
              'a code': { color: theme('colors.gray.100') },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.gray.100'),
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
