import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.jpg';

const Footer: NextPage = () => {
  return (
    <div className="flex h-[150px] w-[100%] flex-row border-t-[1px]">
      <div id="logo" className="flex items-center px-6">
        <Link href="/home">
          <a>
            <Image src={logo} width="300px" height="72px" />
          </a>
        </Link>
      </div>
      <div id="copyright" className="ml-4 flex flex-col p-4">
        <ul className="flex last:mr-0 [&>li]:mr-3 [&>li]:border-r-[2px] [&>li]:border-[#e1e1e1] [&>li]:pr-3 [&>li:hover]:cursor-pointer [&>li:hover]:underline">
          <li>센터 소개</li>
          <li>상담 및 심리검사 서비스</li>
          <li>교육 서비스</li>
          <li>상담문의 및 신청</li>
          <li>센터 소식</li>
        </ul>
        <p className="text-[#999]">주소 : 경기 용인시 기흥구 흥덕중앙로 55 711호 </p>
        <p className="text-[#999]">대표자: 김정희 </p>
        <p className="text-[#999]">전화번호 : 010-4829-3961 </p>
        <p className="text-[#999]">Copyright © 봄, 심리상담센터 All Rights Reserved.</p>
      </div>
      <div className="fixed right-10 bottom-10 cursor-pointer rounded-full border-[1px] bg-[#a9ce8e] text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="m-4 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7l4-4m0 0l4 4m-4-4v18"
          />
        </svg>
      </div>
    </div>
  );
};

export default Footer;
