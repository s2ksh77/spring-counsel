import { NextPage } from 'next';
import Image from 'next/image';
import process from '../../assets/counselor_process.jpg';

const Introduce: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col p-8 pt-4">
      <div className="border-b-2 pb-8 text-3xl font-bold">신청방법 및 이용 절차</div>
      <div className="flex flex-col">
        <div className="mx-auto mt-8 flex">
          <Image src={process} alt="상담 신청 안내" />
        </div>
      </div>
    </div>
  );
};

export default Introduce;
