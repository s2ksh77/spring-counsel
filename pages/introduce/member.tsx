import Layout from '@components/Layout';
import { NextPage } from 'next';
import Image from 'next/image';
import member1 from '../../assets/member1.png';
import member3 from '../../assets/member3.png';
import member4 from '../../assets/member4.png';
import member2 from '../../assets/member2.png';

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
