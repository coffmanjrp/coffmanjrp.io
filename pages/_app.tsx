import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { DefaultSeo } from 'next-seo';
import { store } from '@/app/store';
import SEO from 'next-seo.config';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
