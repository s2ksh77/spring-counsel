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
import Section from '@components/Section';
import Content from '@components/Content';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [menu, setMenu] = useState('');
  const [title, setTitle] = useState('홈');

  useEffect(() => {
    setMenu(router.pathname.split('/')[1]);
  }, [router, menu]);

  const isHome = (): boolean => {
    return router.pathname === '/' || router.pathname === '/home';
  };

  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{title ? `${title} | 봄, 심리상담센터` : '홈 | 봄, 심리상담센터'} </title>
      </Head>
      <div className="mx-auto w-full">
        <GNB setTitle={setTitle} />
        {isHome() ? <Section /> : null}
        <Layout>
          {isHome() ? null : <Menu menu={menu} title={title} />}
          {isHome() ? (
            <Component {...pageProps} />
          ) : (
            <Content>
              <Component {...pageProps} />
            </Content>
          )}
        </Layout>
      </div>
      <Footer />
    </SWRConfig>
  );
}

export default MyApp;
