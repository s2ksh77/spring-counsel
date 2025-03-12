'use client';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';
import { COUNSELOR_LIST } from 'static/member';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

const MemberDetail: NextPage = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const router = useRouter();
  useEffect(() => {
    AOS.init({ duration: 1000 });
    // window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    router.push('/introduce/member');
  };

  const handleClick = (id: number) => {
    router.push(`/introduce/member/${id}`);
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden focus-visible:outline-none sm:w-full">
      <div className="mb-[50px] flex flex-row justify-center gap-4">
        <div
          onClick={handleBack}
          className="rounded-full border-[3px] border-[#454545] p-4 text-[#222] hover:cursor-pointer hover:border-[#fff] hover:bg-[#a9ce8e] hover:text-white"
        >
          <span className="font-semibold">뒤로가기</span>
        </div>
        {COUNSELOR_LIST.map((counselor, idx) => (
          <div
            key={`${counselor.name}-${idx}`}
            onClick={() => handleClick(idx)}
            className="rounded-full border-[3px] border-[#454545] p-4 text-[#222] hover:cursor-pointer hover:border-[#fff] hover:bg-[#a9ce8e] hover:text-white"
          >
            <span className="font-semibold">{counselor.name}</span>
          </div>
        ))}
      </div>
      <div className="mb-[50px] flex flex-row">
        <div
          className="flex min-w-[500px] flex-col items-center rounded-2xl rounded-r-none border-[1px] border-r-0 py-12"
          data-aos="fade-right"
        >
          <Image
            src={COUNSELOR_LIST[id].image}
            width={300}
            height={300}
            sizes="300px"
            alt="상담사 프로필"
          />
        </div>
        <div
          className="w-[calc(100% - 600px)] flex max-w-[600px] flex-col rounded-2xl rounded-l-none border-[1px] border-l-0 p-12"
          data-aos="fade-left"
        >
          <span className="text-2xl font-bold">{COUNSELOR_LIST[id].name}</span>
          <div className="my-4 h-[1px] w-full bg-[#ddd]"></div>
          <div className="markdown flex flex-col gap-4">
            <span className="text-xl font-bold">선생님은 어떤 상담자인가요?</span>
            <span
              className="leading-[1.7] text-[#454545]"
              dangerouslySetInnerHTML={{ __html: COUNSELOR_LIST[id].interview[0] }}
            />
          </div>
          <div className="my-4 h-[1px] w-full bg-[#ddd]"></div>
          <div className="flex flex-col gap-[3px]">
            <span className="pb-4 text-xl font-bold">
              선생님과 상담을 받으면 어떻게 달라지나요? 혹은 무엇이 좋아지나요?
            </span>
            <span
              className="leading-[1.7] text-[#454545]"
              dangerouslySetInnerHTML={{ __html: COUNSELOR_LIST[id].interview[1] }}
            />
          </div>
          <div className="my-4 h-[1px] w-full bg-[#ddd]"></div>
          <div className="flex flex-col gap-[3px]">
            <span className="pb-4 text-xl font-bold">선생님은 어떤 상담을 지향하시나요? </span>
            <span
              className="leading-[1.7] text-[#454545]"
              dangerouslySetInnerHTML={{ __html: COUNSELOR_LIST[id].interview[2] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
