import Layout from '@components/Layout';
import { NextPage } from 'next';
import Image from 'next/image';
import centerIntroduce from '../../assets/center_introduce.jpg';

const Introduce: NextPage = () => {
  return (
    <div className="flex h-full overflow-y-auto">
      <img src={centerIntroduce.src} layout="responsive" width="100%" />
    </div>
  );
};

export default Introduce;
