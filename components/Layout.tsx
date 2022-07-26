import { NextPage } from 'next';
import React from 'react';
import { cls } from 'utils/common';

const Layout: NextPage<{ children: React.ReactNode; isBanner: boolean }> = ({
  children,
  isBanner,
}) => {
  return (
    <div
      className={cls('bg-yello-500 mx-auto h-auto w-full max-w-7xl', isBanner ? '' : ' pt-[112px]')}
    >
      <div className="flex min-h-[795px] flex-row">{children}</div>
    </div>
  );
};

export default Layout;
