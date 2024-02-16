import { NextPage } from 'next';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { cls } from 'utils/common';
import Image from 'next/image';
import fixed5 from '../assets/fixed5.png';
import fixed4 from '../assets/fixed4.png';
import fixed3 from '../assets/banner3.png';

const Layout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isIntroduce = () => {
    return pathname === '/introduce';
  };

  const isLogin = () => {
    return pathname === '/login';
  };

  const isCounsel = (): boolean => {
    return pathname.split('/')[1] === 'counsel';
  };

  const isEducation = (): boolean => {
    return pathname.split('/')[1] === 'education';
  };

  const isProposal = (): boolean => {
    return pathname.split('/')[1] === 'proposal';
  };

  const getClass = () => {
    if (isIntroduce())
      return 'mx-auto h-auto w-full sm:w-full max-w-[100rem] pt-[112px] sm:pt-[40px]';
    else return 'mx-auto h-auto w-full sm:w-full max-w-7xl pt-[112px] sm:pt-[40px]';
  };

  return (
    <div>
      {isCounsel() ? (
        <div className="menu-banner">
          <Image src={fixed5} alt="메뉴별 배너 이미지" />
        </div>
      ) : isEducation() ? (
        <div className="menu-banner">
          <Image src={fixed4} alt="메뉴별 배너 이미지" />
        </div>
      ) : isProposal() ? (
        <div className="menu-banner">
          <Image src={fixed3} alt="메뉴별 배너 이미지" />
        </div>
      ) : null}
      <div className={getClass()}>
        <div
          className={cls(
            'flex min-h-[795px] flex-row sm:w-full sm:flex-col md:flex-col',
            isLogin() ? 'items-center justify-center' : ''
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
