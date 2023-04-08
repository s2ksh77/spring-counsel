import useMap from '@libs/client/useMap';
import { NextPage } from 'next';
import { useEffect } from 'react';

const Location: NextPage = () => {
  useMap();

  return (
    <div className="h-full p-8">
      <div>
        <div className="border-b-2 pb-8 text-3xl font-bold">찾아 오시는 길</div>
      </div>
      <div>
        <div id="map" style={{ width: '100%', height: '500px' }}></div>
      </div>
      <div className="banner-title mt-12 flex flex-col ">
        <span className="text-2xl font-bold sm:text-lg">
          주소 : 경기 용인시 기흥구 흥덕중앙로 55 (흥덕역 리써밋 타워) 711호
        </span>
        <span className="mt-2 text-lg sm:text-sm">
          오시는 방법 : 이마트 흥덕점 건너편, 상가동 건물 옆에 오피스텔 동에서 7층으로 오시면
          됩니다.
        </span>
        <span className="mt-2 text-lg sm:text-sm">연락처 : 010-4829-3961</span>
      </div>
    </div>
  );
};

export default Location;
