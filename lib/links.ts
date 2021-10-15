import { FaEnvelope, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FooterLinks, NavLinks } from './types';

export const footerLinks: FooterLinks = [
  {
    id: 1,
    label: `Visit to coffmanjrp's Github`,
    url: 'https://github.com/coffmanjrp',
    icon: FaGithub,
  },
  {
    id: 2,
    label: `Visit to coffmanjrp's Linkedin`,
    url: 'https://www.linkedin.com/in/paul-coffman-jr/',
    icon: FaLinkedin,
  },
  {
    id: 3,
    label: `Visit to coffmanjrp's Twitter`,
    url: 'https://twitter.com/coffmanjrp',
    icon: FaTwitter,
  },
  {
    id: 4,
    label: 'Send a e-mail to coffmanjrp',
    url: 'mailto:coffmanjrp@gmail.com?subject=%E3%80%90Mail%20to%20coffmanjrp.io%E3%80%91',
    icon: FaEnvelope,
  },
];

export const navLinks: NavLinks = [
  {
    id: 1,
    title: 'Articles',
    path: '/articles',
  },
  {
    id: 2,
    title: 'Projects',
    path: '/projects',
  },
  // {
  //   id: 3,
  //   title: 'Docs',
  //   path: '/docs',
  // },
  // {
  //   id: 4,
  //   title: 'About',
  //   path: '/about',
  // },
];
