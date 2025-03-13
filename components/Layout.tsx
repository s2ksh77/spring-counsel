import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cls } from 'utils/common';
import Image from 'next/image';
import cover1 from '../assets/cover1.webp';
import fixed4 from '../assets/fixed4.png';
import fixed3 from '../assets/banner3.png';

const bannerImages: Record<string, any> = {
  introduce: {
    image: cover1,
    title: '센터 소개',
    submenu: {
      member: {
        title: '센터 구성원 소개',
      },
    },
  },
  member: fixed4,
  proposal: fixed3,
};

function getBannerData(path): { image: StaticImageData; title: string } {
  const [_, rootPath, subPath] = path.split('/');
  const { image, title, submenu } = bannerImages[rootPath];
  if (subPath && submenu)
    return {
      image,
      title: submenu[subPath].title,
    };
  return { image, title };
}

const Layout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const pathSegment = pathname.split('/')[1];

  return (
    <div>
      {bannerImages[pathSegment] && (
        <div className="relative h-[550px] overflow-hidden pt-[0px]">
          <Image src={getBannerData(pathname).image} alt="메뉴별 배너 이미지" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <div className="title text-base tracking-[0.2rem] sm:text-sm">
              <p>봄, 심리상담센터</p>
            </div>
            <div className="mt-2 text-3xl font-bold ">
              <p>{getBannerData(pathname).title}</p>
            </div>
          </div>
        </div>
      )}
      <div
        className={cls(
          'mx-auto h-auto w-full max-w-7xl sm:w-full sm:pt-[40px]',
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
