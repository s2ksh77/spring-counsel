import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cls } from 'utils/common';
import Image, { StaticImageData } from 'next/image';
import { cover1, cover2, cover3, cover4, cover5 } from '../assets';
import Menu from './Menu';

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
  counsel: {
    image: cover2,
    submenu: {
      private: {
        title: '개인상담',
      },
      family: {
        title: '부부 · 가족상담',
      },
      group: {
        title: '집단상담',
      },
      counseltest: {
        title: '심리검사',
      },
    },
  },
  education: {
    image: cover3,
    submenu: {
      counselor: {
        title: '상담자 교육',
      },
      analysis: {
        title: '교육분석',
      },
    },
  },
  proposal: {
    image: cover4,
    title: '상담신청 안내',
    submenu: {
      reservationForm: {
        title: '상담신청',
      },
      list: {
        title: '상담신청 내역',
      },
    },
  },
  news: {
    image: cover5,
    submenu: {
      notice: {
        title: '공지사항',
      },
      review: {
        title: '상담후기',
      },
    },
  },
};

function getBannerData(path): { image: StaticImageData; title: string } {
  const [_, rootPath, subPath] = path.split('/');
  const { image, title, submenu } = bannerImages[rootPath];
  if (subPath && submenu)
    return {
      image,
      title: submenu[subPath] ? submenu[subPath].title : '상담신청 내역',
    };
  return { image, title };
}

const Layout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const pathSegment = pathname.split('/')[1];

  return (
    <div>
      {bannerImages[pathSegment] && (
        <div className="relative h-[550px] overflow-hidden pt-4 sm:h-[350px] md:h-[450px]">
          <Image
            src={getBannerData(pathname).image}
            alt="메뉴별 배너 이미지"
            className="h-full sm:h-[80%] md:h-[80%]"
          />
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
      <Menu menu={pathSegment} />
      <div
        className={cls(
          'mx-auto h-auto w-full max-w-7xl sm:w-full ',
          pathname === '/introduce' ? 'max-w-[100rem]' : '',
        )}
      >
        <div
          className={cls(
            'flex min-h-[795px] flex-row sm:w-full sm:flex-col md:flex-col',
            pathname === '/login' ? 'items-center justify-center' : '',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
