import Layout from '@components/Layout';
import { NextPage } from 'next';

const Content: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={'w-fullborder-[1px] mx-[30px] my-14 sm:mx-0 sm:w-full'}>{children}</div>;
};

export default Content;
