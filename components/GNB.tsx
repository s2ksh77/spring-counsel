import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.jpg';

const GNB: NextPage = () => {
  return (
    <div
      id="gnb"
      className="bg-black-400 border-#f5f5f5 flex h-28 flex-row justify-between border-b-2"
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
          <div className="hover:text-green-400c mx-2 flex h-28 w-40 cursor-pointer items-center justify-center font-medium">
            <div className="dropdown relative mx-2 inline-block h-28 w-40">
              <div>
                <div className="py-[2.7rem] text-center">
                  <span className="font-bold">센터 소개</span>
                </div>
                <ul className="dropdown-menu absolute mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm text-gray-700 shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                  <li className="">
                    <Link href="/introduce">
                      <a
                        className="block px-4 py-6 hover:bg-[#4f4f4f] hover:text-white"
                        href="#"
                      >
                        센터 소개
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/introduce/member">
                      <a className="block px-4 py-6 hover:bg-[#4f4f4f] hover:text-white">
                        센터 구성원 소개
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/introduce/location">
                      <a
                        className="block px-4 py-6 hover:bg-[#4f4f4f] hover:text-white"
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
          <div className="mx-2 flex h-28 w-40 cursor-pointer items-center justify-center font-medium hover:text-green-400">
            <div className="dropdown relative mx-2 inline-block h-28 w-40">
              <div>
                <div className="py-[2.7rem] text-center">
                  <span className="font-bold">상담 소개</span>
                </div>
                <ul className="dropdown-menu absolute mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm  text-gray-700 shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                  <li className="">
                    <Link href="/counsel/private">
                      <a className="block px-4 py-6 hover:bg-[#4f4f4f] hover:text-white">
                        개인 상담
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/counsel/group">
                      <a className="block px-4 py-6 hover:bg-[#4f4f4f] hover:text-white">
                        집단 상담
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/counsel/introduce">
                      <a
                        className="block px-4 py-6 hover:bg-[#4f4f4f] hover:text-white"
                        href="#"
                      >
                        심리 상담
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/counsel/family">
                      <a
                        className="block px-4 py-6 hover:bg-[#4f4f4f] hover:text-white"
                        href="#"
                      >
                        부부 및 가족 상담
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-2 flex h-28 w-40 cursor-pointer items-center justify-center font-medium hover:text-green-400">
            <div className="dropdown relative mx-2 inline-block h-28 w-40">
              <div>
                <div className="py-[2.7rem] text-center">
                  <span className="font-bold">심리 검사</span>
                </div>
                <ul className="dropdown-menu absolute  mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm text-gray-700 shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                  <li className="">
                    <Link href="/counsel/private">
                      <a
                        className="block px-4 py-6 hover:bg-[#4f4f4f] hover:text-white"
                        href="#"
                      >
                        개인 상담
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-2 flex h-28 w-40 cursor-pointer items-center justify-center font-medium hover:text-green-400">
            <Link href="/counsel/private">
              <a className="font-bold">상담 신청</a>
            </Link>
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
