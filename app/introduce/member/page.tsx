'use client';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';
import { COUNSELOR_LIST } from 'static/member';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';

const Member: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (id: number) => {
    router.push(`/introduce/member/${id}`);
  };

  return (
    <div className="overflow-y-auto focus-visible:outline-none sm:w-full">
      <div className="mb-[50px] flex flex-row justify-center gap-4">
        {COUNSELOR_LIST.map((counselor, idx) => (
          <div
            key={`${counselor.name}-${idx}`}
            className="rounded-full border-[3px] border-[#454545] p-4 text-[#222] hover:cursor-pointer hover:border-[#fff] hover:bg-[#a9ce8e] hover:text-white"
          >
            <span className="font-semibold">{counselor.name}</span>
          </div>
        ))}
      </div>
      {COUNSELOR_LIST.map((counselor, idx) => {
        return (
          <div key={`${counselor.image}-${idx}`} className="mb-[50px] flex flex-row">
            <div
              className="flex min-w-[500px] flex-col items-center rounded-2xl rounded-r-none border-[1px] border-r-0 py-12"
              data-aos="fade-right"
            >
              <Image
                src={counselor.image}
                width={300}
                height={300}
                sizes="300px"
                alt="상담사 프로필"
              />
              <div
                onClick={() => handleClick(idx)}
                key={`${counselor.name}-${idx}`}
                className="flex w-[120px] justify-center rounded-full border-[3px] border-[#454545] p-4 text-[#222] hover:cursor-pointer hover:border-[#fff] hover:bg-[#a9ce8e] hover:text-white"
              >
                <span className="text-sm font-semibold">상담사 인터뷰</span>
              </div>
            </div>
            <div
              className="flex w-full flex-col rounded-2xl rounded-l-none border-[1px] border-l-0 p-12"
              data-aos="fade-left"
            >
              <span className="text-2xl font-bold">{counselor.name}</span>
              <div className="my-4 h-[1px] w-full bg-[#ddd]"></div>
              <div className="flex flex-col gap-4">
                <span className="text-xl font-bold">학력</span>
                <span className="text-base text-[#454545]">- {counselor.degree}</span>
              </div>
              <div className="my-4 h-[1px] w-full bg-[#ddd]"></div>
              <div className="flex flex-col gap-[3px]">
                <span className="pb-4 text-xl font-bold">경력사항</span>
                {counselor['experience'].map((experience, idx) => (
                  <span key={`${experience}-${idx}`} className="text-base text-[#454545]">
                    <span className="mr-[6px]">-</span>
                    <span>{experience}</span>
                  </span>
                ))}
              </div>
              <div className="my-4 h-[1px] w-full bg-[#ddd]"></div>
              <div className="flex flex-col gap-[3px]">
                <span className="pb-4 text-xl font-bold">자격사항</span>
                {counselor['certifications'].map((certification, idx) => (
                  <span key={`${certification}-${idx}`} className="text-base text-[#454545]">
                    <span className="mr-[6px]">-</span>
                    <span>{certification}</span>
                  </span>
                ))}
              </div>
              <div className="my-4 h-[1px] w-full bg-[#ddd]"></div>
              {counselor['research'].length > 0 && (
                <div className="flex flex-col gap-[3px]">
                  <span className="pb-4 text-xl font-bold">연구 및 강의</span>
                  {counselor['research'].map((research, idx) => (
                    <span
                      key={`${research}-${idx}`}
                      className="flex flex-row text-base text-[#454545]"
                    >
                      <span className="mr-[6px]">-</span>
                      <span>{research}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Member;
