import { createCx } from '@joebell/cx';

const shortcuts = {
  'b-heading': ['text-5xl', 'font-bold', 'gray-900', 'dark:text-gray-100'],
  'b-paragraph': ['text-base', 'text-gray-600', 'dark:text-gray-100'],
  'b-lead': ['font-semibold', 'text-gray-600', 'dark:text-gray-100'],
  'b-link': [
    'text-base',
    'text-gray-600',
    'dark:text-gray-100',
    'no-underline',
    'hover:opacity-75',
    'focus:outline-none',
    'focus:ring',
  ],
  'u-main': ['w-full', 'max-w-screen-md', 'mx-auto'],
  'c-nav-title': [
    'text-lg',
    'text-gray-600',
    'dark:text-gray-100',
    'no-underline',
    'hover:opacity-75',
    'focus:outline-none',
    'focus:ring',
  ],
  'c-footer': [
    'mx-auto',
    'pt-4',
    'pb-16',
    'max-w-screen-md',
    'w-full',
    'bg-gray-100',
    'dark:bg-gray-900',
    'z-20',
  ],
};

export const cx = createCx(shortcuts);
