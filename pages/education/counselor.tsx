import Layout from '@components/Layout';
import { NextPage } from 'next';
import Image from 'next/image';
import banner from '../../assets/banner/private.png';
import process from '../../assets/process.jpg';

const Counselor: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">상담자 교육</div>
      <span>
        <div className=" w-[100%] bg-white p-4 ">
          <div className="text-lg text-[#5f727f]">
            상담전문가로 성장하기 위해 필수적인 과정의 하나인 수퍼비전은 상담에 대한 이론적 지식과
            실천적인 경험을 통합시키는 과정입니다.
            <br />
            상담자의 발달수준에 맞는 수퍼비전을 제공함으로써 상담자가 사례에 대한 전체적인 조망과
            성찰을 통해 사례에 대한 자신감을 발달시키고, 내담자를 보호하고 성장시킬 수 있습니다.
          </div>
        </div>
        <hr className="my-8" />
        <div>
          <span className="text-xl font-bold">수퍼비전의 중요성</span>
          <div className="ml-12 mb-4 flex flex-row">
            <div className="mt-8">
              <div className="text-[#878787]">
                수퍼비전을 통하여 상담자로서의 자질, 인격을 닦아 나가면서 구체적인 상담기술이 함께
                습득된다.
              </div>
              <div className="text-[#878787]">
                상담시간에 깨닫지 못한 내다자의 전이감정을 깨닫는데 도움이 된다.
              </div>
              <div className="text-[#878787]">구체적인 교정을 받을 수 있게 된다.</div>
              <div className="text-[#878787]">
                수퍼비전을 통해 자신의 문제를 깨닫게 되어 상담을 더욱 촉진시킨다.
              </div>
            </div>
          </div>
          <hr className="my-8" />
          <span className="text-xl font-bold">수퍼비전의 주제</span>
          <div className="mt-8 mb-4 font-bold text-[#444]">전문능력</div>
          <div className="ml-8 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                치료계획을 수행하기 위해 기술과 기법을 사용할 능력을 의미
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 font-bold text-[#444]">정서적 자각</div>
          <div className="ml-8 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                상담자가 상담 및 수퍼비전 관계에서 나타나는 감정을 자각하고 효율적으로 사용하는 능력
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 font-bold text-[#444]">자율성</div>
          <div className="ml-8 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">어떤 상황에서 선택하고 결정할 수 있는 능력 </div>
            </div>
          </div>
          <div className="mt-8 mb-4 font-bold text-[#444]">정체감</div>
          <div className="ml-8 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                상담자로서 충분히 기능하는 전문가가 되기 위해서는 통합된 이론적 정체감을 갖는다는
                것을 의미
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 font-bold text-[#444]">개인차의 존중</div>
          <div className="ml-8 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                상담자가 내담자를 독자적인 인간으로 보고 그의 배경, 가치, 신체적 의미 등의 차이를
                인식할 수 있는 능력
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 font-bold text-[#444]">목적과 방향</div>
          <div className="ml-8 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                상담의 목표를 설정하는 기능을 나타내며 치료계획의 확립을 포함
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 font-bold text-[#444]">개인적 동기</div>
          <div className="ml-8 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                상담자가 전문 영역인 상담을 선택하게 된 이유에 대한 충분한 이해
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 font-bold text-[#444]">전문적 윤리</div>
          <div className="ml-8 mb-4 flex flex-row">
            <div>
              <div className="text-[#878787]">
                상담자로서 지켜야 할 윤리적 문제들에 대해 인식하고 정해진 윤리적 규준에서 벗어나지
                않게 행동하는 것
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default Counselor;
