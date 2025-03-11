import Layout from '@components/Layout';
import { NextPage } from 'next';

const Content: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={'mx-[30px] my-14 w-full sm:mx-0 sm:w-full md:mx-0 md:w-full lg:w-full'}>
      {children}
    </div>
  );
};

export default Content;
