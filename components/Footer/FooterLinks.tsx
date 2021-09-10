import { FC } from 'react';
import { footerLinks } from '@/lib/links';

const FooterLinks: FC = () => {
  return (
    <div className="flex gap-4 md:mb-0 mb-2">
      {footerLinks.length > 0 &&
        footerLinks.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.id}
              href={link.url}
              className="block text-2xl text-gray-600 no-underline hover:opacity-75 focus:outline-none focus:ring dark:text-gray-50"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={link.label}
            >
              <Icon />
            </a>
          );
        })}
    </div>
  );
};

export default FooterLinks;
