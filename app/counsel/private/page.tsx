'use client';
import { useEffect } from 'react';
import { NextPage } from 'next';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Private: NextPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-full w-full flex-col p-8 sm:w-full md:w-full">
      <div className="border-b-2 pb-8 text-3xl font-bold" data-aos="fade-left">
        개인상담
      </div>
      <span>
        <div className=" w-[100%] bg-white p-4 ">
          <div className="mb-4 text-xl font-bold" data-aos="fade-left">
            개인 상담이란 ?{' '}
          </div>
          <div className="font-xl text-md p-2" data-aos="fade-right">
            <div className="ml-12 pb-4 text-[#878787]">나 자신을 알고 싶을 때</div>
            <div className="ml-12 pb-4 text-[#878787]">혼자 해결하기 힘든 문제가 있을 때</div>
            <div className="ml-12 pb-4 text-[#878787]">미래와 진로에 대한 불안이 있을 때</div>
            <div className="ml-12 pb-4 text-[#878787]">
              나의 성격이나 정서 등을 객관적으로 알고 싶을 때
            </div>
            <div className="ml-12 pb-4 text-[#878787]">
              부족하게 느껴지는 나를 성장시키고 싶을 때
            </div>
          </div>
        </div>
        <div className="text-lg text-[#5f727f]">
          자신과 관련된 모든 것들에 대하여 상담심리전문가와 1:1로 이루어지며 상담 내용에 대해서는
          절대 비밀이 보장됩니다. 상담은 주 1회 50분 평균적으로 15회 정도 진행이 되나 개인이 가지고
          있는 문제에 따라 조절될 수 있습니다.
        </div>
        <hr className="my-8" />
        <div>
          <span className="text-xl font-bold" data-aos="fade-left">
            개인상담이 가능한 영역
          </span>
          <div className="flex flex-row">
            <div
              data-aos="fade-right"
              className="m-4 flex h-24 w-24 items-center justify-center rounded-full border-[2px] p-4"
            >
              성격
            </div>
            <div
              data-aos="fade-right"
              className="m-4 flex h-24 w-24 items-center justify-center rounded-full border-[2px] p-[0.8rem]"
            >
              대인관계
            </div>
            <div
              data-aos="fade-right"
              className="m-4 flex h-24 w-24 items-center justify-center rounded-full border-[2px] p-4"
            >
              정서
            </div>
            <div
              data-aos="fade-right"
              className="m-4 flex h-24 w-24 items-center justify-center rounded-full border-[2px] p-4"
            >
              진로
            </div>
            <div
              data-aos="fade-right"
              className="m-4 flex h-24 w-24 items-center justify-center rounded-full border-[2px] p-4"
            >
              학업
            </div>
            <div
              data-aos="fade-right"
              className="m-4 flex h-24 w-24 items-center justify-center rounded-full border-[2px] p-[0.8rem]"
            >
              이성관계
            </div>
            <div
              data-aos="fade-right"
              className="m-4 flex h-24 w-24 items-center justify-center rounded-full border-[2px] p-4"
            >
              기타
            </div>
          </div>
        </div>
        <hr className="my-8" />
        <div>
          <span className="text-xl font-bold">상담 내용</span>
          <div className="mb-4 mt-8 w-[90px] font-bold text-[#444]" data-aos="fade-right">
            학업
          </div>
          <div className="mb-4 ml-12 flex flex-row" data-aos="fade-left">
            <div>
              <div className="text-[#878787]">공부에 집중할 수 없을 때</div>
              <div className="text-[#878787]">시험 전 불안과 긴장이 심할 때</div>
              <div className="text-[#878787]">
                적절한 시간관리 방법에 대하여 도움을 받고 싶을 때
              </div>
            </div>
          </div>

          <div className="mb-4 mt-8 w-[90px] font-bold text-[#444]" data-aos="fade-right">
            대인관계
          </div>
          <div className="mb-4 ml-12 flex flex-row" data-aos="fade-left">
            <div>
              <div className="text-[#878787]">원만한 대인관계를 맺는 방법을 알고 싶을 때</div>
              <div className="text-[#878787]">
                다른 사람이 나를 어떻게 보는지 걱정되고 신경이 쓰일 때
              </div>
              <div className="text-[#878787]">사람 사귀는 것이 힘들 때</div>
              <div className="text-[#878787]">가족 간의 관계에서 갈등을 느낄 때</div>
            </div>
          </div>
          <div className="mb-4 mt-8 w-[90px] font-bold text-[#444]" data-aos="fade-right">
            진로적성
          </div>
          <div className="mb-4 ml-12 flex flex-row" data-aos="fade-left">
            <div>
              <div className="text-[#878787]">내가 어떤 일을 하면서 살아가야할지 고민스러울 때</div>
              <div className="text-[#878787]">전공과 적성에 맞지 않아 고민스러울 때</div>
              <div className="text-[#878787]">앞으로의 진로에 대하여 자신이 없을 때</div>
            </div>
          </div>
          <div className="mb-4 mt-8 w-[90px] font-bold text-[#444]" data-aos="fade-right">
            정서
          </div>
          <div className="mb-4 ml-12 flex flex-row" data-aos="fade-left">
            <div>
              <div className="text-[#878787]">
                우울, 긴장, 불안이 심하거나 사소한 일에도 과민하게 스트레스 받을 때
              </div>
              <div className="text-[#878787]">쉽게 화나거나 혼란을 느낄 때</div>
              <div className="text-[#878787]">
                좌절감이나 무기력, 실패감, 의욕상실, 죽고 싶은 생각이 들 때
              </div>
            </div>
          </div>
          <div className="mb-4 mt-8 w-[90px] font-bold text-[#444]" data-aos="fade-right">
            성격
          </div>
          <div className="mb-4 ml-12 flex flex-row" data-aos="fade-left">
            <div>
              <div className="text-[#878787]">내 성격에 대한 탐색을 통해 나를 이해하고 싶을 때</div>
              <div className="text-[#878787]">자신의 성격이 만족스럽지 않을 때</div>
              <div className="text-[#878787]">보다 성숙한 사람이 되고 싶을 때</div>
              <div className="text-[#878787]">감정이나 생각을 자연스럽게 표현하기 어려울 때</div>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default Private;
