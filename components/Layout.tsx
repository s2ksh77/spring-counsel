import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { cls } from 'utils/common';

const Layout: NextPage<{ children: React.ReactNode; isBanner: boolean }> = ({
  children,
  isBanner,
}) => {
  const router = useRouter();

  const isIntroduce = () => {
    return router.pathname === '/introduce';
  };

  const isLogin = () => {
    return router.pathname === '/login';
  };

  const getClass = () => {
    if (!isBanner && isIntroduce())
      return 'mx-auto h-auto w-full sm:w-full max-w-[100rem] pt-[112px] sm:pt-[40px]';
    else if (!isBanner && !isIntroduce())
      return 'mx-auto h-auto w-full sm:w-full max-w-7xl pt-[112px] sm:pt-[40px]';
    else if (isBanner && !isIntroduce()) return 'mx-auto h-auto w-full sm:w-full max-w-7xl';
    else return 'mx-auto h-auto w-full sm:w-full max-w-7xl pt-[112px] sm:pt-[40px]';
  };

  return (
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
  );
};

export default Layout;
