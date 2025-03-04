import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cls } from 'utils/common';
import Image from 'next/image';
import fixed5 from '../assets/fixed5.png';
import fixed4 from '../assets/fixed4.png';
import fixed3 from '../assets/banner3.png';

const bannerImages: Record<string, any> = {
  counsel: fixed5,
  education: fixed4,
  proposal: fixed3,
};

const Layout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const pathSegment = pathname.split('/')[1];

  return (
    <div>
      {bannerImages[pathSegment] && (
        <div className="menu-banner">
          <Image src={bannerImages[pathSegment]} alt="메뉴별 배너 이미지" />
        </div>
      )}
      <div
        className={cls(
          'mx-auto h-auto w-full max-w-7xl pt-[112px] sm:w-full sm:pt-[40px]',
          pathname === '/introduce' && 'max-w-[100rem]'
        )}
      >
        <div
          className={cls(
            'flex min-h-[795px] flex-row sm:w-full sm:flex-col md:flex-col',
            pathname === '/login' && 'items-center justify-center'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
