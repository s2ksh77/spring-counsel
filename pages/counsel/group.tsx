import Layout from '@components/Layout';
import { NextPage } from 'next';
import Image from 'next/image';
import banner from '../../assets/banner/private.png';
import process from '../../assets/process.jpg';

const Group: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">집단상담</div>
      <span>
        <div className=" w-[100%] bg-white p-4 ">
          <div className="text-lg text-[#5f727f]">
            자신과 유사한 관심사를 가진 여러 사람이 모여 함께 이야기를 공유하고 상호작용 하는 과정
            속에서 나와 타인의 성장을 도모합니다. 대략 10명 내외의 참가자들이 1~2명의 전문상담자의
            진행에 따라 진행됩니다.
          </div>
        </div>
        <hr className="my-8" />
        <div>
          <span className="text-xl font-bold">상담 내용</span>
          <div className="mt-8 mb-4 w-[100%] font-bold text-[#444]">자아성장</div>
          <div className="ml-12 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                나와 타인의 경험들을 자각하고 공유하면서 참 만남을 경험하고, 인격의 성장을 꾀 하는
                프로그램
              </div>
            </div>
          </div>

          <div className="mt-8 mb-4 w-[100%] font-bold text-[#444]">이성관계 향상</div>
          <div className="ml-12 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                이성에 대한 올바른 이해를 통해 이성관계의 특성을 이해하고, 자신의 감정과 생각 을
                표현할 수 있도록 돕는 프로그램
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 w-[100%] font-bold text-[#444]">진로탐색</div>
          <div className="ml-12 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                자신의 진로 및 직업세계의 이해를 증진시키는 다양한 활동을 통해 보다 합리적인 진로를
                선택할 수 있도록 돕는 프로그램
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 w-[100%] font-bold text-[#444]">대인관계 향상</div>
          <div className="ml-12 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                원만한 대인관계를 유지하거나 관계를 맺는 것에 어려움을 느끼는 학생을 위해 다 양한
                대안을 탐색해보고 건강한 대인관계를 형성하도록 돕는 프로그램
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 w-[100%] font-bold text-[#444]">자기표현 및 주장력 향상</div>
          <div className="ml-12 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                자신감 부족으로 자신의 능력을 충분히 발휘하지 못하는 학생들에게 자기 이해를 증진하고
                자신감을 회복하도록 돕는 프로그램
              </div>
            </div>
          </div>
        </div>
        <hr className="my-8" />

        <div className="flex flex-col">
          <span className="text-xl font-bold">신청방법 및 이용 절차</span>
          <div className="mx-auto flex">
            <Image src={process} />
          </div>
        </div>
      </span>
    </div>
  );
};

export default Group;
