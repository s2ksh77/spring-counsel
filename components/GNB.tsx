import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.jpg';

const GNB: NextPage = () => {
  return (
    <div
      id="gnb"
      className="bg-black-400 border-#f5f5f5 fixed flex h-28 w-[100%] flex-row justify-between border-b-2 bg-white"
    >
      <div className="flex">
        <div id="logo" className="flex cursor-pointer">
          <Link href="/home">
            <a>
              <Image src={logo} width="300px" height="112px" />
            </a>
          </Link>
        </div>
      </div>
      <div>
        <div id="menu" className="flex">
          <div className="mx-2 flex h-28 w-52 cursor-pointer items-center justify-center font-medium  ">
            <div className="dropdown relative mx-2 inline-block h-28 w-40">
              <div>
                <div className="py-[2.7rem] text-center">
                  <span className="font-bold">센터 소개</span>
                </div>
                <ul className="dropdown-menu absolute mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm text-[#777777] shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                  <li className="">
                    <Link href="/introduce">
                      <a
                        className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white"
                        href="#"
                      >
                        센터 소개
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/introduce/member">
                      <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white">
                        센터 구성원 소개
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/introduce/location">
                      <a
                        className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white"
                        href="#"
                      >
                        찾아 오시는 길
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-2 flex h-28 w-52 cursor-pointer items-center justify-center font-medium ">
            <div className="dropdown relative mx-2 inline-block h-28 w-48">
              <div>
                <div className="py-[2.7rem] text-center">
                  <span className="font-bold">상담 및 심리검사 서비스</span>
                </div>
                <ul className="dropdown-menu absolute mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm  text-[#777777] shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                  <li className="">
                    <Link href="/counsel/private">
                      <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white">
                        개인상담
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/counsel/family">
                      <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white">
                        커플 · 부부상담
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/counsel/group">
                      <a
                        className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white"
                        href="#"
                      >
                        집단상담
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/counsel/introduce">
                      <a
                        className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white"
                        href="#"
                      >
                        심리검사
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-2 flex h-28 w-52 cursor-pointer items-center justify-center font-medium ">
            <div className="dropdown relative mx-2 inline-block h-28 w-40">
              <div>
                <div className="py-[2.7rem] text-center">
                  <span className="font-bold">교육 서비스</span>
                </div>
                <ul className="dropdown-menu absolute  mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm text-[#777777] shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                  <li className="">
                    <Link href="/counsel/private">
                      <a
                        className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white"
                        href="#"
                      >
                        상담자 교육
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/counsel/private">
                      <a
                        className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white"
                        href="#"
                      >
                        교육분석
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-2 flex h-28 w-52 cursor-pointer items-center justify-center font-medium ">
            <div className="dropdown relative mx-2 inline-block h-28 w-40">
              <div>
                <div className="py-[2.7rem] text-center">
                  <span className="font-bold">상담문의 및 신청</span>
                </div>
                <ul className="dropdown-menu absolute  mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm text-[#777777] shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                  <li className="">
                    <Link href="/counsel/private">
                      <a
                        className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white"
                        href="#"
                      >
                        상담신청 안내
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-2 flex h-28 w-52 cursor-pointer items-center justify-center font-medium ">
            <div className="dropdown relative mx-2 inline-block h-28 w-40">
              <div>
                <div className="py-[2.7rem] text-center">
                  <span className="font-bold">센터 소식</span>
                </div>
                <ul className="dropdown-menu absolute  mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm text-[#777777] shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                  <li className="">
                    <Link href="/counsel/private">
                      <a
                        className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white"
                        href="#"
                      >
                        공지사항
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/counsel/private">
                      <a
                        className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white"
                        href="#"
                      >
                        상담후기
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id="login" className="mr-4 flex w-20 py-7">
            <button className="text-black-300 w-20 bg-yellow-300">로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GNB;
