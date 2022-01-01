import { FC } from 'react';
import { footerLinks } from '@/lib/links';

const FooterLinks: FC = () => {
  return (
    <div className="flex gap-4 md:mb-0 mb-2">
      {footerLinks.length > 0 &&
        footerLinks.map((link) => {
          const { id, url, label, icon } = link;
          const Icon = icon;

          return (
            <a
              key={id}
              href={url}
              className="icon-link text-2xl"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
            >
              <Icon />
            </a>
          );
        })}
    </div>
  );
};

export default FooterLinks;
