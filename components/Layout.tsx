import { NextPage } from 'next';
import { cls } from 'utils/common';

const Layout: NextPage = ({ children, isBanner }) => {
  return (
    <div
      className={cls('bg-yello-500 mx-auto h-auto w-full max-w-7xl', isBanner ? '' : ' pt-[112px]')}
    >
      <div className="flex min-h-[795px] flex-row">{children}</div>
    </div>
  );
};

export default Layout;
