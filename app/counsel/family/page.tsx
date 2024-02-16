import { NextPage } from 'next';
import Image from 'next/image';
import family from '../../../assets/family.jpg';

const Family: NextPage = () => {
  return (
    <div>
      <div className="flex h-full w-full flex-col p-8">
        <div className="border-b-2 pb-8 text-3xl font-bold">부부·가족상담</div>
        <span>
          <div className="mt-8">
            <span className="text-xl font-bold">상담 내용</span>
            <div className="mt-8">
              <div className="ml-12 pb-4 text-[#878787]">성격이나 가치관의 차이가 있을 때</div>
              <div className="ml-12 pb-4 text-[#878787]">의사소통의 문제로 갈등이 있을 때</div>
              <div className="ml-12 pb-4 text-[#878787]">자녀양육과 관련한 어려움이 있을 때</div>
            </div>
          </div>
          <hr className="my-8" />

          <div className="relative mt-12">
            <Image src={family} alt="가족 사진" />
            <div className="banner-title absolute bottom-4 w-[50%] px-[4rem] py-4 text-xl text-white">
              <p>
                가족체계는 움직이는 장난감 모빌과 같다. <br />
                <br />
                장난감 모빌에서와 같이 가족 모빌에서도 한 부분을 움직이면 다른 부분들도 움직인다.
                <br /> <br />
                (Satir, 1972)
              </p>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Family;
