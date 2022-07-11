import { NextPage } from 'next';

const Layout: NextPage = ({ children }) => {
  return <div className="bg-yello-500 mx-auto h-auto w-full max-w-7xl">{children}</div>;
};

export default Layout;
