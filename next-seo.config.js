import { baseUrl } from '@/config/index';

const title = 'coffmanjrp.io';
const description =
  'Hello, I’m Paul Coffman Jr. I’m Frontend, Backend, Web developer. Fluent in English/Japanese.';
const keywords = 'Frontend Developer, Backend Developer, Web Developer';

const SEO = {
  titleTemplate: `%s | ${title}`,
  description,
  keywords,
  canonical: baseUrl,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: baseUrl,
    title,
    description,
    images: [
      {
        url: `${baseUrl}/og.png`,
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  site_name: title,
  additionalLinkTags: [
    {
      rel: 'icon',
      href: `/favicon.ico`,
    },
  ],
  twitter: {
    handle: '@coffmanjrp',
    site: '@coffmanjrp',
    cardType: 'summary_large_image',
  },
};

export default SEO;
