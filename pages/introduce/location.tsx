import useMap from '@libs/client/useMap';
import { NextPage } from 'next';

const Location: NextPage = () => {
  useMap();

  return (
    <div className="h-full p-8">
      <div>
        <div className="border-b-2 pb-8 text-3xl font-bold">찾아 오시는 길</div>
      </div>
      <div>
        <div id="map" style={{ width: '100%', height: '500px' }} />
      </div>
      <div className="banner-title mt-12 flex flex-col ">
        <span className="text-xl font-bold sm:text-lg">
          주소 : 경기 수원시 영통구 영통로 498, 145동 101호
        </span>
        <span className="text-m mt-2 sm:text-sm">
          대중교통 이용: 분당선 청명역 6번출구 (도보 5분 이내)
        </span>
        <span className="mt-2 text-sm sm:text-sm">연락처 : 010-6220-1850</span>
      </div>
    </div>
  );
};

export default Location;
