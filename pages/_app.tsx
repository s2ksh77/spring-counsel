import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.jpg';
import GNB from '@components/GNB';
import Layout from '@components/Layout';
import Head from 'next/head';
import Footer from '@components/Footer';
import { useRouter } from 'next/router';
import Menu from '@components/Menu';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [key, setKey] = useState('');

  useEffect(() => {
    console.log(router.pathname.split('/')[1]);
    setKey(router.pathname.split('/')[1]);
    console.log(key);
  }, [router, key]);

  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}>
      <Head>
        <title>봄, 심리상담센터</title>
      </Head>
      <div className="mx-auto w-full">
        <GNB />
        <Layout>
          <Menu key={key} />
          <Component {...pageProps} />
        </Layout>
      </div>
      <Footer />
    </SWRConfig>
  );
}

export default MyApp;
