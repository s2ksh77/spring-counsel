import Layout from '@components/Layout';
import { NextPage } from 'next';

const Content: NextPage = ({ children }) => {
  return <div className="mx-[30px] my-14 w-full border-[1px]">{children}</div>;
};

export default Content;
