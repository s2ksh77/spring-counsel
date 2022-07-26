import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Link from 'next/link';
import { NextPage, NextPageContext } from 'next';
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
import useLogin from '@libs/client/useLogin';
import Script from 'next/script';
import banner from '../assets/banner/private.png';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [menu, setMenu] = useState('');

  useEffect(() => {
    setMenu(router.pathname.split('/')[1]);
  }, [router, menu]);

  const isHome = (): boolean => {
    return router.pathname === '/' || router.pathname === '/home';
  };

  const isLogin = (): boolean => {
    return router.pathname === '/login';
  };

  const isProposalList = (): boolean => {
    return router.pathname === '/proposal/list' || router.pathname === '/proposal/[id]';
  };

  const isCounsel = (): boolean => {
    return router.pathname.split('/')[1] === 'counsel';
  };

  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{'봄, 심리상담센터'} </title>
      </Head>
      <div className="mx-auto w-full">
        <GNB />
        {isHome() && !isLogin() ? <Section /> : null}
        {isCounsel() ? <Image src={banner} /> : null}
        <Layout isBanner={isCounsel()}>
          {isHome() || isLogin() || isProposalList() ? null : <Menu menu={menu} />}
          {isHome() || isLogin() ? (
            <Component {...pageProps} />
          ) : (
            <Content>
              <Component {...pageProps} />
            </Content>
          )}
        </Layout>
      </div>
      <Footer />
      <Script
        strategy="beforeInterative"
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r19hf0h6dl"
      />
    </SWRConfig>
  );
}

export default MyApp;
