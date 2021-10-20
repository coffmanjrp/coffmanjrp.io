const styles = {
  heading: ['text-5xl', 'font-bold', 'text-gray-900', 'dark:text-gray-100'],
  paragraph: ['text-base', 'text-gray-600', 'dark:text-gray-100'],
  lead: ['font-semibold', 'text-gray-600', 'dark:text-gray-100'],
  link: {
    primary: ['link', 'link-primary'],
    secondary: ['link', 'link-secondary'],
    icon: ['link', 'icon-link'],
  },
  main: ['w-full', 'max-w-screen-md', 'mx-auto'],
  footer: [
    'mx-auto',
    'pt-4',
    'pb-16',
    'max-w-screen-md',
    'w-full',
    'bg-gray-100',
    'dark:bg-gray-900',
    'z-20',
  ],
  icon: { container: ['block', 'm-auto'] },
  nav: {
    title: [
      'text-lg',
      'text-gray-600',
      'dark:text-gray-100',
      'no-underline',
      'hover:opacity-75',
      'focus:outline-none',
      'focus:ring',
    ],
  },
};

export default styles;
