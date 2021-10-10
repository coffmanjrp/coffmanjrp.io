import { FC } from 'react';
import clsx from 'clsx';
import FooterLinks from './FooterLinks';
import styles from '@/styles/index';

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto pt-4 pb-16 max-w-screen-md w-full z-20 bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between flex-col-reverse md:flex-row items-center">
        <p className={clsx(styles.paragraph)}>{year} &copy; coffmanjrp.io</p>
        <FooterLinks />
      </div>
    </footer>
  );
};

export default Footer;
