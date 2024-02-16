'use client';
/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import GNB from '@components/GNB';
import Layout from '@components/Layout';
import Head from 'next/head';
import Footer from '@components/Footer';
import { usePathname, useRouter } from 'next/navigation';
import Menu from '@components/Menu';
import { Component, ReactNode, useEffect, useState } from 'react';
import Section from '@components/Section';
import Content from '@components/Content';
import Script from 'next/script';
import CustomHead from './head';

function MyApp({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menu, setMenu] = useState('');
  const [loginState, setLoginState] = useState(false);
  const title = '봄, 심리상담센터';

  const isHome = (): boolean => {
    return pathname === '/' || pathname === '/home';
  };

  const isLogin = (): boolean => {
    return pathname === '/login';
  };

  const isProposalList = (): boolean => {
    return pathname === '/proposal/list' || pathname === '/proposal/[id]';
  };

  useEffect(() => {
    setMenu(pathname.split('/')[1]);
  }, [router, menu]);

  return (
    <html lang="ko">
      <Head>
        <CustomHead title="봄, 심리상담센터" />
        <meta name="description" content={`일단 잠시대기`} />
        <meta property="og:title" content="봄, 심리상담센터" />
        <meta property="og:site_name" content="봄, 심리상담센터" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bom-counseling.com/" />
        <meta property="og:description" content={`일단 잠시대기`} />
        <meta property="og:locale" content="ko_KR" />
        <meta
          property="og:image"
          content="https://spring-counsel.s3.ap-northeast-2.amazonaws.com/logo-main.jpg"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="text/javascript"
          src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r19hf0h6dl"
          defer
        />
      </Head>
      <body>
        <SWRConfig
          value={{
            fetcher: (url: string) => {
              console.log('url', url);
              return fetch(url).then((res) => {
                console.log('res', res);
                return res.json();
              });
            },
          }}
        >
          <div className="mx-auto w-full overflow-y-auto overflow-x-scroll">
            <GNB loginState={loginState} setLoginState={setLoginState} />
            {isHome() && !isLogin() ? <Section /> : null}
            <Layout>
              {isHome() || isLogin() || isProposalList() ? null : <Menu menu={menu} />}
              {isHome() || isLogin() ? (
                <div className="sm:w-full">{children}</div>
              ) : (
                <Content>{children}</Content>
              )}
            </Layout>
          </div>
          <Footer />
        </SWRConfig>
      </body>
      <Script
        strategy="afterInteractive"
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r19hf0h6dl"
      />
    </html>
  );
}

export default MyApp;
