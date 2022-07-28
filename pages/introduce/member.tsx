import Layout from '@components/Layout';
import { NextPage } from 'next';
import Image from 'next/image';
import member1 from '../../assets/member1.png';
import member3 from '../../assets/member3.jpg';
import member2 from '../../assets/member2.jpg';

const Member: NextPage = () => {
  return (
    <div className="overflow-y-auto">
      <Image src={member1} layout="fixed" />
      <Image src={member3} layout="fixed" />
      <Image src={member2} layout="fixed" />
    </div>
  );
};

export default Member;
