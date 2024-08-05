import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo-main.jpg';
import kakao from '../assets/kakao-logo.png';

const Footer: NextPage = () => {
  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex h-[150px] w-[100%] flex-row border-t-[1px]">
      <div id="logo" className="flex cursor-pointer items-center overflow-y-hidden px-6 sm:hidden">
        <div>
          <Link href="/home">
            <Image src={logo} width={250} height={250} alt="봄, 심리상담센터 로고" />
          </Link>
        </div>
      </div>
      <div id="copyright" className="ml-4 flex flex-col p-4">
        <ul className="flex last:mr-0 sm:hidden md:hidden [&>a>li:hover]:cursor-pointer [&>a>li:hover]:underline [&>a>li]:mr-3 [&>a>li]:border-r-[2px] [&>a>li]:border-[#e1e1e1] [&>a>li]:pr-3">
          <Link href="/introduce">
            <li>센터 소개</li>
          </Link>
          <Link href="/counsel/private">
            <li>상담 및 심리검사 서비스</li>
          </Link>
          <Link href="/education/counselor">
            <li>교육 서비스</li>
          </Link>
          <Link href="/proposal">
            <li>상담문의 및 신청</li>
          </Link>
          <Link href="/news/notice">
            <li>센터 소식</li>
          </Link>
        </ul>
        <p className="text-[#999]">
          주소 : 경기 수원시 영통구 영통로 498, 황골마을주공 1단지 145동 101호{' '}
        </p>
        <p className="text-[#999]">대표자: 김정희 </p>
        <p className="text-[#999]">전화번호 : 010-6220-1850 </p>
        <p className="text-[#999]">Copyright © 봄, 심리상담센터 All Rights Reserved.</p>
      </div>
      <div
        onClick={() =>
          window.open(
            'http://pf.kakao.com/_jxggLb/friend',
            '_blank',
            'width=480, height=500, left=600, top=300'
          )
        }
      >
        <div className="z-101 fixed bottom-28 right-10 cursor-pointer">
          <Image
            src={kakao}
            width={58}
            height={58}
            className="rounded-full"
            priority
            alt="카카오톡 채널 이미지"
          />
        </div>
      </div>
      <div
        onClick={handleScrollTop}
        className="fixed bottom-10 right-10 cursor-pointer rounded-full border-[1px] bg-[#a9ce8e] text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="m-4 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
        </svg>
      </div>
    </div>
  );
};

export default Footer;
