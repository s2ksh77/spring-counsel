import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.jpg';
import GNB from '@components/GNB';
import Layout from '@components/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}>
      <Head>
        <title>봄, 심리상담센터</title>
      </Head>
      <div className="mx-auto w-full">
        <GNB />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SWRConfig>
  );
}

export default MyApp;
