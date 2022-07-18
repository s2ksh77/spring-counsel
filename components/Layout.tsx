import { NextPage } from 'next';

const Layout: NextPage = ({ children }) => {
  return (
    <div className="bg-yello-500 mx-auto h-auto w-full max-w-7xl pt-[112px] ">
      <div className="flex min-h-[800px] flex-row">{children}</div>
    </div>
  );
};

export default Layout;
