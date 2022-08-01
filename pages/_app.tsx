/* eslint-disable @next/next/no-before-interactive-script-outside-document */
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
import Script from 'next/script';
import fixed5 from '../assets/fixed5.png';
import fixed4 from '../assets/fixed4.png';
import fixed3 from '../assets/banner3.png';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [menu, setMenu] = useState('');
  const [loginState, setLoginState] = useState(false);
  const title = '봄, 심리상담센터';

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

  const isEducation = (): boolean => {
    return router.pathname.split('/')[1] === 'education';
  };

  const isProposal = (): boolean => {
    return router.pathname.split('/')[1] === 'proposal';
  };

  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
      <div className="mx-auto w-full">
        <GNB loginState={loginState} setLoginState={setLoginState} />
        {isHome() && !isLogin() ? <Section /> : null}
        {isCounsel() ? (
          <Image src={fixed5} />
        ) : isEducation() ? (
          <Image src={fixed4} />
        ) : isProposal() ? (
          <Image src={fixed3} />
        ) : null}
        <Layout isBanner={isCounsel() || isEducation() || isProposal()}>
          {isHome() || isLogin() || isProposalList() ? null : <Menu menu={menu} />}
          {isHome() || isLogin() ? (
            <Component {...pageProps} setLoginState={setLoginState} />
          ) : (
            <Content>
              <Component {...pageProps} />
            </Content>
          )}
        </Layout>
      </div>
      <Footer />
      <Script
        strategy="beforeInteractive"
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r19hf0h6dl"
      />
    </SWRConfig>
  );
}

export default MyApp;
