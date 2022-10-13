import Layout from '@components/Layout';
import { NextPage } from 'next';
import Image from 'next/image';
import member1 from '../../assets/member1.jpg';
import member3 from '../../assets/member3.jpg';
import member4 from '../../assets/member4.jpg';
import member2 from '../../assets/member2.jpg';

const Member: NextPage = () => {
  return (
    <div className="overflow-y-auto sm:w-full">
      <Image src={member1} />
      <Image src={member2} />
      <Image src={member3} />
      <Image src={member4} />
    </div>
  );
};

export default Member;
