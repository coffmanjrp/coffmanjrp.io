import { FC } from 'react';
import FooterLinks from './FooterLinks';

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto pt-4 pb-16 max-w-screen-md w-full z-20 bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between flex-col-reverse md:flex-row items-center">
        <p className="paragraph">{year} &copy; coffmanjrp.io</p>
        <FooterLinks />
      </div>
    </footer>
  );
};

export default Footer;
